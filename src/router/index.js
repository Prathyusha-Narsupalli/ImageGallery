import Vue from 'vue'
import VueRouter from 'vue-router'
import RandomImage from '../components/RandomImage'
import ImageList from '../components/ImageList'
import selectedImage from '../components/selectedImage'
import ErrorPage from '../components/ErrorPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "ImageList",
    component: ImageList,

  },
  {
    path: '/random',
    name: "RandomImage",
    component: RandomImage
  },
  {
    path: "/select/:id",
    name: "selectedImage",
    component: selectedImage,
    props: true
  },
{
    path:'*',
    name:'error',
    component: ErrorPage,
},
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

