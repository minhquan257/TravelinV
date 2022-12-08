import "../PersonalPage.css";
import { BsBookmarkHeartFill } from "react-icons/bs";
import { BsFillHandbagFill } from "react-icons/bs";
import { BsFillFilterSquareFill } from "react-icons/bs";
import {useEffect, useContext} from 'react';
import {useState} from 'react';
import { FaEdit } from "react-icons/fa";
import { BsTextRight } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { MdOutlineBookmarkRemove } from "react-icons/md";
import { RiDislikeLine } from "react-icons/ri";
import axios from "axios"
import { UserContext } from "../App";

const User={userName:'taitai', name:'Trần Võ Tấn Tài', image:'https://daohieu.com/wp-content/uploads/2020/05/meo-con.jpg'}

const tabs=[{name:'Post', style:<BsFillFilterSquareFill className='Thang_a'></BsFillFilterSquareFill>},{name:'PostLike', style: <BsBookmarkHeartFill className='Thang_'></BsBookmarkHeartFill>}]

export default function PersonalPage() {
    // const [User, setUser] = useContext(UserContext);
    const [type, setType] = useState('Post')
    const [Content, setContent] = useState([{}])
    const [CountPost, setCountPost] = useState();
    const [CountPostLike, setCountPostLike] = useState();


    useEffect(()=>{
        const FecthCountPostLike = async ()=>{
            try{
                await axios.get(`http://localhost:8800/${User.userName}/Personal/PostLike`).then((response) =>{
                    setCountPostLike(response.data.length)
                })
            } catch (err) {
                console.log(err)
            }
        };
        // const FecthName = async ()=>{
        //     try{
        //         await axios.get(`http://localhost:8800/${User.userName}/Personal`).then((response) =>{
        //             setName(response.data)
        //         })
        //     } catch (err) {
        //         console.log(err)
        //     }
        // };
        FecthCountPostLike()
        // FecthName()
    },[])
    // console.log(PostPersonal)
    // const FecthAllPersonal = async ()=>{
    //     try{
    //         await axios.get("http://localhost:8800/user").then((response) =>{
    //             // console.log(response.data)
    //             setPostPersonal(response.data)
    //         })
    //     } catch (err) {
    //         console.log(err)
    //     }
    // };
    // FecthAllPersonal()
    // useEffect(() => {
    //     FecthAllPersonal()
    // },[])
    useEffect(() => {
        const FecthAllPost = async ()=>{
            try{
                await axios.get(`http://localhost:8800/${User.userName}/Personal/${type}`).then((response) =>{
                   response.data && setContent(response.data)
                   if(type === 'Post')
                    setCountPost(response.data.length)
                    else if(type === 'PostLike')
                    setCountPostLike(response.data.length)
                })
            } catch (err) {
                console.log(err)
            }
        };
        FecthAllPost()
    },[type])

    const handleDeletePost = async (id) => {
        try {
          await axios.delete(`http://localhost:8800/${User.userName}/Personal/DeleteLike/${id}`);
          await axios.delete(`http://localhost:8800/${User.userName}/Personal/DeletePostDes/${id}`);
          await axios.delete(`http://localhost:8800/${User.userName}/Personal/DeletePost/${id}`);
          await axios.get(`http://localhost:8800/${User.userName}/Personal/${type}`).then((response) =>{
                   response.data && setContent(response.data)
                    setCountPost(response.data.length)
                })
        //   window.location.reload()
        } catch (err) {
          console.log(err);
        }
      };
      const handleDeletePostLike = async (id) => {
        try {
          await axios.delete(`http://localhost:8800/${User.userName}/Personal/DeleteLike/${id}`);
          await axios.get(`http://localhost:8800/${User.userName}/Personal/${type}`).then((response) =>{
                   response.data && setContent(response.data)
                    setCountPostLike(response.data.length)
                })
        //   window.location.reload()
        } catch (err) {
          console.log(err);
        }
      };

function HandlCoutEvent(type, id)
{
    if(type==='Post')
        return (
        <ul className='Thang_edit_remove'>
            <li id='Thang_li1'>
                <span className='Thang_span'><MdEdit id='mdedit'></MdEdit></span> Edit
            </li>
            <li id='Thang_li2' onClick={()=>{handleDeletePost(id)}}>
                <span className='Thang_span'><MdOutlineBookmarkRemove id='mdremove'></MdOutlineBookmarkRemove></span> Remove
            </li>
        </ul>)
    else if (type==='PostLike')
            return (
            <ul className='Thang_edit_remove'>
                <li className='Thang_li' onClick={()=>{handleDeletePostLike(id)}}>
                    <span className='Thang_span'><RiDislikeLine id='mdremove'></RiDislikeLine></span> Unlike
                </li>
            </ul>)
}

    return (
    <div className = "Thang_avatar">
    {/* {setType('Post')} */}
    {/* {console.log(PostPersonal)} */}
        <div id='Thang_avatar_child'>
            <img src={User.image}/>  
        </div>
        <div id='Thang_card'>
            </div>

        <div id='Thang_content0'>
            <ul id="Thang_edit_setting">
                <button id='Thang_setting'> <FaEdit></FaEdit></button>
                <button id="Thang_edit">Chỉnh sửa thông tin cá nhân</button>
            </ul>
            <p className='Thang_name'>{User.name}</p>  
            <div id='Thang_tab'>
                <p className="Thang_tab_content"><span>{CountPost}</span> {tabs[0].name}</p>
                <p className="Thang_tab_content"><span>{CountPostLike}</span> {tabs[1].name}</p>
            </div>
        </div>
        <div>
        <hr id='Thang_hr'/>
        </div>
        <div id = 'Thang_content'>
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    style={type === tab.name ? 
                        {
                            color:'black',
                            borderTop: '2px outset #5f5f5f',
                        } : {}}
                    onClick={()=>setType(tab.name)}
                > 
                <div><span>{tab.style}</span><p>{tab.name}</p></div>
                </button>
            ))}
           
        </div>
        
        <div id ='Thang_content1'>
            {console.log(Content)}
            {/* {console.log(PostPersonal)} */}
            {Content.map((Content0)=>(
                <div key={Content0.idPost}>
                    <img src={Content0.image}/>
                    <p id='Thang_CONTENT_mokuji'>
                        <li className="Thang_li"><a id='Thang_text_right'><BsTextRight id='Thang_bstextright'></BsTextRight></a>
                            {HandlCoutEvent(type, Content0.idPost)}
                        </li>
                    </p>
                    <p id='Thang_CONTENT'>
                        <p>{Content0.name}</p>
                        <h1 id='Thang_Content_Author'>{Content0.postName}</h1>
                        <p>{Content0.provinceName}&nbsp;&nbsp;&nbsp;&nbsp;{Content0.Day}-{Content0.Month}-{Content0.Year}</p>
                    </p>
                </div>
            ))}
        </div>

    </div>
    );
}
