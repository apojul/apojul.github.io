<template
  ><v-container fluid pa-0>
    <v-footer absolute color="light-blue darken-3"
      ><v-col justify-space-between
        ><span class="white--text"
          >&copy;{{ new Date().getFullYear() }}
        </span></v-col
      ><v-col justify-space-between class="text-center"
        ><strong class="white--text">@ Andres - Pascal</strong></v-col
      >
      <v-col justify-space-between class="text-right"
        ><span class="white--text ">Toulouse - FRANCE</span></v-col
      >
    </v-footer></v-container
  >
</template>

<script>
export default {
  name: 'Footer'
}
</script>
