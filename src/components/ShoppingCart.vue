<template>
  <v-card color="#FFFFFF" height="100%" class="text-center">
    <v-toolbar dark color="primary" class="mb-3">
      <v-toolbar-title>Total</v-toolbar-title>
      <v-spacer />
      <div class="text-h6">{{(total.price).toFixed(2) + '$'}}</div>
    </v-toolbar>
      <v-row justify="center" v-for="item in items" :key="item.id" class="ma-3">
      <v-sheet class="rounded-lg mb-3" elevation="6" width="100%" max-width="700">
        <v-row>
          <v-col>{{item.title}}</v-col>
          <v-col>{{item.quantity+'x'}}</v-col>
          <v-col>{{(item.quantity*item.unitPrice).toFixed(2) +'$'}}</v-col>
          <v-col>
            <v-btn icon>
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-col>
      </v-row>
      </v-sheet>
     </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ShoppingCart",

  props: ["items"],
  data: () => ({}),
  computed: {
    total() {
      let total = { price: 0, quantity: 0 };
      this.items.forEach((i) => {
        total.price += i.unitPrice * i.quantity;
        total.quantity += parseInt(i.quantity);
      });
      return total;
    },
  },
};
</script>

<style scoped>
</style>