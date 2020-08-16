import CreditCardForm from "@/components/CreditCardForm.vue";
import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);
const localVue = createLocalVue()

describe('CreditCardForm.vue', () => {

    let vuetify

    const correctCard = {
        id: "Visa1",
        holder: "Luis Martinez",
        number: "4591849168766332",
        expiry: "2020-01",
        cvv: "000",
    }

    const incorrectCard = {
        //CVV is wrong in this one
        id: "Visa1",
        holder: "Luis Martinez",
        number: "4591849168766332",
        expiry: "2020-01",
        cvv: "AAA",
    }

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    test('Incorrect card is not accepted', async () => {
        const wrapper = mount(CreditCardForm, {
            localVue,
            vuetify,
            propsData: {
                cardToEdit: null
            }

        })

        wrapper.setData({ card: incorrectCard })

        await wrapper.vm.$nextTick()
        wrapper.vm.submit()

        expect(wrapper.emitted().createdCard).toBeFalsy()
        expect(wrapper.emitted().editedCard).toBeFalsy()
    })

    test('New card is added', async () => {
        const wrapper = mount(CreditCardForm, {
            localVue,
            vuetify,
            propsData: {
                cardToEdit: null
            }

        })

        wrapper.setData({ card: correctCard })

        await wrapper.vm.$nextTick()
        wrapper.vm.submit()

        expect(wrapper.emitted().createdCard).toBeTruthy()
    })

    test('Card is edited', async () => {
        const wrapper = mount(CreditCardForm, {
            localVue,
            vuetify,
            propsData: {
                cardToEdit: correctCard
            }
        })

        await wrapper.vm.$nextTick()
        wrapper.vm.submit()

        expect(wrapper.emitted().editedCard).toBeTruthy()
    })




})