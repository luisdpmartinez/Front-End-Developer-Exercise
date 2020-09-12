<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="$emit('close');">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>My card</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="submit">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <vue-paycard :value-fields="valueFields" />
      <v-form class="mt-12" ref="form">
        <v-row dense>
          <v-col cols="6">
            <v-text-field v-model="card.holder" :rules="rules.holder" label="Card holder name"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="card.number" :rules="rules.number" label="Card number"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-menu absolute>
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="card.expiry"
                  :rules="rules.expiry"
                  label="Expiry date"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker type="month" v-model="card.expiry"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="card.cvv" :rules="rules.cvv" label="CVV"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="card.id" :rules="rules.id" label="Card name"></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import Vue from 'vue'

export default {
  name: "CreditCardForm",
  computed: {
    valueFields() {
      var preview={}
      preview.cardName=this.card.holder
      preview.cardNumber=this.card.number.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')
      preview.cardCVV=this.card.cvv
      preview.cardMonth=this.card.expiry.substring(5,7)
      preview.cardYear=this.card.expiry.substring(0,4)
      return preview
    }
  },
  props: ["cardToEdit"],
  data: () => ({
    card: { id: "", holder: "", number: "", expiry: "", cvv: "" },
    newCard: false,
    rules: {
      id: [(v) => !!v || "Card name is required"],
      holder: [
        (v) => !!v || "Card holder name is required",
        (v) => /^((?:[A-Za-z]+ ?){1,3})$/.test(v) || "Invalid card holder name",
      ],
      number: [
        (v) => !!v || "Card number is required",
        (v) =>
          /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/.test(v) ||
          "Card number invalid",
      ],
      expiry: [(v) => !!v || "Expiry date is required"],
      cvv: [
        (v) => !!v || "CVV is required",
        (v) => /^[0-9]{3}$/.test(v) || "CVV must be 3 digits",
      ],
    },
  }),
  created() {
    if (this.cardToEdit == null) {
      this.newCard = true;
    } else {
      this.card = Vue.util.extend({}, this.cardToEdit)
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        if (this.newCard) {
          this.$emit("createdCard", this.card);
        } else {
          this.$emit("editedCard", this.card, this.cardToEdit.id);
        }
      }
    },
  },
};
</script>
