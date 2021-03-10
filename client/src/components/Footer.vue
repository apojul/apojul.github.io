<template>
  <v-card height="40px" rounded="0">
    <v-footer padless fixed color="#026AA7"
      ><v-col justify-space-between class="text-left footer white--text"
        >&copy;{{ new Date().getFullYear() }} </v-col
      ><v-col justify-space-between class="text-center footer white--text"
        ><strong class="">@ Andres - Pascal</strong></v-col
      >
      <v-col justify-space-between class="text-right footer white--text"
        >Toulouse - FRANCE</v-col
      >
    </v-footer></v-card
  >
</template>

<script>
export default {
  name: 'Footer'
}
</script>
