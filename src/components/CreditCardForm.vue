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
      <v-row dense>
        <v-col cols="6">
          <v-text-field v-model="card.holder" label="Card Holder Name" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="card.number" label="Card Number" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="card.expiry" label="Expiry Date" required></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-text-field v-model="card.cvv" label="CVV" required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="card.id" label="Card name" required></v-text-field>
        </v-col>
      </v-row>
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
  }),
  created() {
      console.log(this.cardToEdit)
    if (this.cardToEdit == null) {
      this.newCard = true;
    } else {
      this.card = this.cardToEdit;
    }
  },
  methods: {
    save() {
      if (this.newCard) {
        this.$emit("createdCard", this.card);
      } else {
        this.$emit("editedCard", this.card);
      }
    },
  },
};
</script>
