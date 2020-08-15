<template>
  <v-stepper alt-labels v-model="currentStep" class="elevation-0 pb-5" height="100%">
    <v-stepper-header class="elevation-0">
      <v-stepper-step :complete="currentStep > 1" step="1">Shipping</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="currentStep > 2" step="2">Payment</v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="currentStep > 3" step="3">Review</v-stepper-step>
    </v-stepper-header>
    <div
      v-if="$vuetify.breakpoint.mobile"
      class="text-h6 text--secondary text-center"
    >{{steps[currentStep-1]}}</div>
    <v-stepper-items>
      <v-stepper-content step="1">
        <v-form ref="shipping">
          <v-row>
            <v-col class="text-right">
              <v-btn @click="currentStep += 1" color="primary">Next</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-list two-line>
          <v-list-item-group v-model="selected" mandatory active-class="blue--text">
            <template v-for="c in cards">
              <v-list-item :key="c.id">
                <template v-slot:default="{ active }">
                  <v-btn icon @click.stop="editCard(c)"><v-icon>mdi-pencil</v-icon></v-btn>
                  <v-list-item-content>
                    <v-list-item-title v-text="c.id"></v-list-item-title>
                    <v-list-item-subtitle class="text--primary" v-text="c.holder"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="c.number"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon v-if="!active">mdi-checkbox-blank-circle-outline</v-icon>
                    <v-icon v-else>mdi-checkbox-marked-circle</v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>
            </template>
            <v-divider />
          </v-list-item-group>
          <v-row justify="end">
            <v-btn @click.stop="editCard(null)" text>
              <v-icon>mdi-plus-circle-outline</v-icon>Add new card
            </v-btn>
          </v-row>
        </v-list>

        <v-row>
          <v-col class="text-left">
            <v-btn @click="currentStep -= 1">Back</v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn @click="currentStep += 1" color="primary">Next</v-btn>
          </v-col>
        </v-row>

        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <CreditCardForm :key="formKey" @close="dialog=false" @createdCard="addCard" @editedCard="saveCard" v-bind:cardToEdit="cardToEdit"/>
        </v-dialog>
      </v-stepper-content>

      <v-stepper-content step="3">
        {{this.cards[this.selected]}}
        <v-row>
          <v-col class="text-left">
            <v-btn @click="currentStep -= 1">Back</v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn color="success">Order</v-btn>
          </v-col>
        </v-row>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import CreditCardForm from "@/components/CreditCardForm.vue";

export default {
  name: "CheckoutForm",
components: {
    CreditCardForm,
  },
  data: () => ({
    dialog: false,
    formKey:0,
    currentStep: 2,
    selected: 0,
    cardToEdit: null,
    cards: [
      {
        id: "Visa1",
        holder: "Luis Martinez",
        number: "555555555555",
        expiry: "01/01",
        cvv: "000",
      },
      {
        id: "Mastercard1",
        holder: "Luis Martinez",
        number: "777777777777",
        expiry: "02/02",
        cvv: "111",
      },
    ],
    steps: ["Shipping", "Payment", "Review"],
  }),
  methods: {
    editCard(card){
      this.cardToEdit=card
      this.dialog=true
    },
    addCard(card){
      this.cards.push(card)
      this.dialog=false
    },
    saveCard(card){
      this.cardToEdit=card
      this.dialog=false
    },
  },
  watch: {
    dialog(){
      this.formKey+=1
    }
  }
};
</script>
