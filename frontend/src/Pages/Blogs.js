import React from 'react';
import "../App.css"
import "../Blogs.css"
import SliderBlogs from "../components/SliderBlogs";
import { useEffect, useState } from 'react';
import axios from "axios"
import { Link } from 'react-router-dom';
import Goto from "../components/Goto"

// const USERNAME = 'taitai'
// hello
export default function Blogs() {
  const [FeaturedPost, setFeaturePost] = useState([{}])
  const [RecentPost, setRecentPost] = useState([{}])

  useEffect(()=>{
    const FecthFeaturePost = async ()=>{
        try{
            await axios.get(`http://localhost:8800/Blogs/FeaturedPost`).then((response) =>{
                setFeaturePost(response.data)
                // console.log(response.data)
            })
        } catch (err) {
            console.log(err)
        }
    };
    const FecthRecentPost = async ()=>{
        try{
            await axios.get(`http://localhost:8800/Blogs/RecentPost`).then((response) =>{
                setRecentPost(response.data)
                // console.log(response.data)
            })
        } catch (err) {
            console.log(err)
        }
    };
    FecthFeaturePost()
    FecthRecentPost()
},[])

  return ( 
  <div>
    {/* {console.log(FeaturedPost)} */}
    <div class=" h1-container">
      <h1>Travel Tips</h1>
    </div>
    <nav class="goto-container">
    <ul>
    <span>
      Go to: 
    </span>
    <Goto/>
    </ul>
  </nav>
  <div className="body-ctn">
  <div class=" featured-container">  
    <h2>Featured Posts</h2>
    <div className="featured-post-ctn">

      {FeaturedPost.map((FeaturedPosts, index)=>{
        return(
          <div class="image-ctn" >
          <a href = "">
            <span className="post-name" >{FeaturedPosts.postName}</span>
            <img className = "featured-img" src={FeaturedPosts.image} ></img>
          </a>
          </div>
        )
      })}
      {/* <div class="image-ctn2" >
      <a href="">
      <span className="post-name" > {FeaturedPost[1].postName}</span>
        <img className="featured-img" src={FeaturedPost[1].image} alt="image not found"></img>
      </a>
      </div> */}
    </div>
    </div>
    <div class="recent">
    <h2>Recent Posts</h2>
      <div className="recent-post-ctn" >
        {RecentPost.map((RecentPosts,index)=>{
          return(
            <div className="img-recent-ctn1" >
            <a href="" >
              <span className="post-name-recent" >{RecentPosts.postName}</span>
              <img className="recent-img" src={RecentPosts.image} ></img>
            </a>
          </div>
          )
        })}
        {/* <div className="img-recent-ctn1">
          <span className="post-name-recent">{RecentPost[0].postName}</span>
          <img className="recent-img" src={RecentPost[0].image} class="recent-img" alt=""></img>
        </div>
        <div className="img-recent-ctn2">
           <span className="post-name-recent">{RecentPost[1].postName}</span>
          <img  class="recent-img" src={RecentPost[1].image} alt=""></img>
        </div>
        <div className="img-recent-ctn3">
          <span className="post-name-recent">{RecentPost[2].postName}</span>
        <img class="recent-img" src={RecentPost[2].image} alt=""></img>
        </div> */}
      </div>
  </div>

</div>
<div class="slider-ctn">
        <div class="slider-div">
          <SliderBlogs/>
        </div>
</div>

</div> 
  )
}