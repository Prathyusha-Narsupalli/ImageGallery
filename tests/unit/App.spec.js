import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router'
import App from '../../src/App.vue'
import BootstrapVue from 'bootstrap-vue'

describe('In App Component',()=>{
    let wrapper;
    let routes=[
      {
        path:'/',
        name:"ImageList",
        
       
      },
      {
       path:'/select/:id',
       name:"SelectedImage",
       
       props:true,
       
     },
      
      {
       path:'/random',
       name:"RandomImage",
       
      },
      {
        path:'/:catchAll(.*)',
        name:"NotFound",
        
      }
    ]
    const router=new VueRouter({routes})
      beforeEach(()=>{
     const localVue=createLocalVue()
     localVue.use(VueRouter)
     localVue.use(BootstrapVue)
     wrapper= shallowMount(App, {
      localVue,
      router
    })
      })

      afterEach(()=>{
          wrapper.destroy();
      })

      it('is a Vue instance',()=>{
          expect(wrapper.isVueInstance).toBeTruthy();
      })

      it('renders the correct markup',()=>{
          expect(wrapper.html()).toContain('<div id="app">');
      })

      it('it renders the correct markup', () => {
        const expected = '<b-navbar-stub tag="nav" toggleable="sm" type="dark" variant="dark">';
        expect(wrapper.html()).toContain(expected);
      })

      it('it should have a <b-navbar-brand> element', () => {
        expect(wrapper.contains('b-navbar-brand-stub')).toBe(true);
      })

      it('it should have a <b-navbar-toggle> element', () => {
        expect(wrapper.contains('b-navbar-toggle-stub')).toBe(true);
      })

      it('it should have a <b-navbar-toggle> element', () => {
        expect(wrapper.contains('b-navbar-toggle-stub')).toBe(true);
      })

      it('it should have two <b-nav-item> element', () => {
        expect(wrapper.findAll('b-nav-item-stub').length).toBe(2);
      })

      it('renders a router-link tag with to images url', () => {
        expect(wrapper.vm.$route.path).toBe(routes[0].path);
      })

      it('renders a router-link tag with to random url', () => {
        expect(wrapper.find('[href="#/random"]')).toBeTruthy(); //id selectors are represents in square brackets
      })

})