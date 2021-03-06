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
        <v-container>
          <v-row>
            <v-spacer />
            <p>Todo</p>
            <v-spacer />
          </v-row>
          <v-form ref="shipping">
            <v-row>
              <v-col class="text-right">
                <v-btn @click="currentStep += 1" color="primary">Next</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-container>
          <v-list two-line height="300px" style="overflow-y:scroll;">
            <v-list-item-group v-model="selected" active-class="blue--text">
              <template v-for="c in cards">
                <v-list-item :key="c.id">
                  <template v-slot:default="{ active }">
                    <div class="mr-3">
                      <v-btn icon @click.stop="deleteCard(c.id)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                      <v-btn icon @click.stop="editCard(c)">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </div>
                    <v-list-item-content>
                      <v-list-item-title v-text="c.id"></v-list-item-title>
                      <v-list-item-subtitle class="text--primary" v-text="c.holder"></v-list-item-subtitle>
                      <v-list-item-subtitle>{{c.number | censor}}</v-list-item-subtitle>
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
              <v-btn
                :disabled="this.cards.length<1 || typeof selected === 'undefined'"
                @click="currentStep += 1"
                color="primary"
              >Next</v-btn>
            </v-col>
          </v-row>

          <v-bottom-sheet v-model="dialog" persistent>
            <CreditCardForm
              :key="formKey"
              @close="dialog=false"
              @createdCard="addCard"
              @editedCard="saveCard"
              v-bind:cardToEdit="cardToEdit"
            />
          </v-bottom-sheet>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-container>
           <vue-paycard v-if="typeof selected !== 'undefined'" :value-fields="valueFields" />
          
          <v-row class="mt-12">
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
   computed: {
    valueFields() {
      var preview={}
      preview.cardName=this.cards[this.selected].holder
      preview.cardNumber=this.cards[this.selected].number.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')
      preview.cardCVV=this.cards[this.selected].cvv
      preview.cardMonth=this.cards[this.selected].expiry.substring(5,7)
      preview.cardYear=this.cards[this.selected].expiry.substring(0,4)
      return preview
    }
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
        number: "4591849168766332",
        expiry: "2020-01",
        cvv: "000",
      },
      {
        id: "Mastercard1",
        holder: "Luis Martinez",
        number: "5343629376550415",
        expiry: "2020-02",
        cvv: "111",
      },
    ],
    steps: ["Shipping", "Payment", "Review"],
  }),
  methods: {
    getIndex(id) {
      for (let index = 0; index < this.cards.length; index++) {
        if (this.cards[index].id === id) {
          return index;
        }
      }
      // not found, need to handle better
      return -1;
    },
    deleteCard(id) {
      if (confirm("Are you sure you want to delete this card?")) {
        if (this.cards.length === 1) {
          this.selected = undefined;
        }
        this.cards.splice(this.getIndex(id), 1);
      }
    },
    editCard(card) {
      this.cardToEdit = card;
      this.dialog = true;
    },
    addCard(card) {
      this.cards.push(card);
      this.dialog = false;
    },
    saveCard(card, id) {
      this.cards[this.getIndex(id)] = card;
      this.dialog = false;
    },
  },
  filters: {
    censor: function (value) {
      if (!value) return "";
      value = value.toString();
      return "**** **** **** " + value.substr(value.length - 4);
    },
  },
  watch: {
    dialog() {
      this.formKey += 1;
    },
  },
};
</script>
