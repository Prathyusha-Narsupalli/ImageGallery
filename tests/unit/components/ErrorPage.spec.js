import { shallowMount} from '@vue/test-utils'
import ErrorPage from './../../../src/components/ErrorPage.vue'


describe("In PageNotFound Component",()=>{
    let wrapper;
    beforeEach(()=>{

        wrapper=shallowMount(ErrorPage,{
            // Will resolve globally-registered-component with
            // empty stub
            stubs: ['b-button']
          });
    })
    afterEach(()=>{
        wrapper.destroy()
    })

    it('is a Vue instance',()=>{
        expect(wrapper.isVueInstance).toBeTruthy()
    })

   it("Should have a h3 tag with crt text", () => {
    expect(wrapper.find('h3').text()).toBe("This Page Doesn't Exist")
    
  })
})