<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="$emit('close');">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>My card</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="save">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <v-form ref="form">
        <v-row dense>
          <v-col cols="6">
            <v-text-field v-model="card.holder" :rules="holderRules" label="Card holder name"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="card.number" :rules="numberRules" label="Card number"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-menu  absolute>
              <template v-slot:activator="{ on }">
                <v-text-field v-model="card.expiry" :rules="expiryRules" label="Expiry date" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker type="month" v-model="card.expiry"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="card.cvv" :rules="cvvRules" label="CVV"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="card.id" :rules="idRules" label="Card name"></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "CreditCardForm",

  props: ["cardToEdit"],
  data: () => ({
    card: { id: "", holder: "", number: "", expiry: "", cvv: "" },
    newCard: false,
    idRules: [ v => !!v || 'Card name is required',],
    holderRules: [ v => !!v || 'Card holder name is required',  v=> /^((?:[A-Za-z]+ ?){1,3})$/.test(v) || 'Invalid card holder name'],
    numberRules: [ v => !!v || 'Card number is required', v => /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/.test(v) || 'Card number invalid'],
    expiryRules: [ v => !!v || 'Expiry date is required',],
    cvvRules: [ v => !!v || 'CVV is required',  v => /^[0-9]{3}$/.test(v) || 'CVV must be 3 digits'],
  }),
  created() {
    if (this.cardToEdit == null) {
      this.newCard = true;
    } else {
      this.card = this.cardToEdit;
    }
  },
  methods: {
    save() {
      if (this.$refs.form.validate()) {
        if (this.newCard) {
          this.$emit("createdCard", this.card);
        } else {
          this.$emit("editedCard", this.card);
        }
      }
    },
  },
};
</script>
