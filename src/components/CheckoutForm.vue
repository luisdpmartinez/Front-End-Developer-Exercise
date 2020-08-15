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
        <v-list two-line height="300px" style="overflow-y:scroll;">
          <v-list-item-group v-model="selected" mandatory active-class="blue--text">
            <template v-for="c in cards">
              <v-list-item :key="c.id">
                <template v-slot:default="{ active }">
                  <v-btn icon @click.stop="editCard(c)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
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
          </v-list-item-group>
        </v-list>
        <v-row justify="end">
          <v-btn @click.stop="editCard(null)" text>
            <v-icon>mdi-plus-circle-outline</v-icon>Add new card
          </v-btn>
        </v-row>

        <v-row>
          <v-col class="text-left">
            <v-btn @click="currentStep -= 1">Back</v-btn>
          </v-col>
          <v-col class="text-right">
            <v-btn @click="currentStep += 1" color="primary">Next</v-btn>
          </v-col>
        </v-row>

        <v-bottom-sheet v-model="dialog">
          <CreditCardForm
            :key="formKey"
            @close="dialog=false"
            @createdCard="addCard"
            @editedCard="saveCard"
            v-bind:cardToEdit="cardToEdit"
          />
        </v-bottom-sheet>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-container>
          <v-card color="#000080" dark max-width="300" class="mx-auto">
            <v-card-title>
              <v-icon large left>mdi-credit-card</v-icon>
              <span class="title">{{this.cards[this.selected].id}}</span>
            </v-card-title>
            <v-card-text class="headline font-weight-bold">{{this.cards[this.selected].number}}</v-card-text>
            <v-card-actions>
              <v-list-item class="grow">
                <v-list-item-content>
                  <v-list-item-title>{{this.cards[this.selected].holder}}</v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <span class="subheading mr-2">{{this.cards[this.selected].expiry}}</span>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>

          <v-row>
            <v-col class="text-left">
              <v-btn @click="currentStep -= 1">Back</v-btn>
            </v-col>
            <v-col class="text-right">
              <v-btn color="success">Order</v-btn>
            </v-col>
          </v-row>
        </v-container>
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
    formKey: 0,
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
    editCard(card) {
      this.cardToEdit = card;
      this.dialog = true;
    },
    addCard(card) {
      this.cards.push(card);
      this.dialog = false;
    },
    saveCard(card) {
      this.cardToEdit = card;
      this.dialog = false;
    },
  },
  watch: {
    dialog() {
      this.formKey += 1;
    },
  },
};
</script>
