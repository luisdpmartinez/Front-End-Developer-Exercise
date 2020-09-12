<template>
  <v-card color="#FFFFFF" height="100%" class="text-center">
    <v-toolbar dark color="primary" class="mb-3">
      <v-toolbar-title>Total</v-toolbar-title>
      <v-spacer />
      <div class="text-h6">{{(total.price).toFixed(2) + '$'}}</div>
    </v-toolbar>
    <v-container>
      <v-row>
        <v-col cols="12" v-for="item in items" :key="item.id">
          <v-card dark color="primary">
            <v-row class="align-center ml-3">
              <v-col cols="1">
                <v-avatar>
                <v-img height="75" contain  :src="item.photo"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="3">
                {{item.title}}
              </v-col>
              <v-col cols="3">
                <v-btn icon dark :disabled="item.quantity==1" @click="item.quantity-=1">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                {{item.quantity+'x'}}
                <v-btn icon dark @click="item.quantity+=1">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="3">{{(item.quantity*item.unitPrice).toFixed(2) +'$'}}</v-col>
              <v-col cols="2">
                <v-btn icon>
                  <v-icon>mdi-close-circle-outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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