import CreditCardForm from "@/components/CreditCardForm.vue";
import {shallowMount} from '@vue/test-utils'
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

describe('CreditCardForm',() =>{
    
    test('New card is added', async()=>{
        const wrapper = shallowMount(CreditCardForm,  {
            propsData: {
            cardToEdit: null
            }
        })

        wrapper.vm.save()
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted().createdCard).toBeTruthy()
    })
    
    test('Card is edited', async()=>{
        const wrapper = shallowMount(CreditCardForm, {
            propsData: {
            cardToEdit: {
                id: "Visa1",
                holder: "Luis Martinez",
                number: "4591849168766332",
                expiry: "2020-01",
                cvv: "000",
              }
            }
        })

        wrapper.vm.save()
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted().editedCard).toBeTruthy()
    })
})