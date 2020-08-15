<template>
  <v-row no-gutters>
    <v-col v-if="!$vuetify.breakpoint.mobile">
      <ShoppingCart v-bind:items="items" />
    </v-col>
    <v-col>
      <v-card height="100%" class="d-flex flex-column">
        <v-card-title class="justify-center">
          <span class="headline">Checkout</span>
        </v-card-title>
        <v-card-text>
          <CheckoutForm />
        </v-card-text>
        <v-footer absolute color="primary" class="justify-center" v-if="$vuetify.breakpoint.mobile">
          <v-bottom-sheet v-model="sheet">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text dark v-bind="attrs" v-on="on">
                <v-icon>mdi-cart</v-icon>Cart
              </v-btn>
            </template>
              <ShoppingCart v-bind:items="items" />
          </v-bottom-sheet>
        </v-footer>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ShoppingCart from "@/components/ShoppingCart.vue";
import CheckoutForm from "@/components/CheckoutForm.vue";

export default {
  name: "Home",
  components: {
    ShoppingCart,
    CheckoutForm,
  },
  data: () => ({
    sheet: false,
    items: [
      { title: "iPhone", quantity: "1", unitPrice: "1000.00" },
      { title: "Charger", quantity: "1", unitPrice: "30.00" },
      { title: "Cover", quantity: "2", unitPrice: "20.00" },
    ],
  }),
};
</script>
