<template>
  <v-container class="background-div" fluid>
    <div id="urlList" class="background-div pb-5 mb-5">
      <v-row class="mx-5">
        <v-col class="pt-0">
          <v-breadcrumbs
            class="pa-0"
            :items="breadcrumbs"
            divider=">"
          />
        </v-col>
      </v-row>
      jg
      <div class="mt-2 mx-5 mb-5 pb-5">
        <v-data-table
          :loading="isLoading"
          loading-text="Loading... Please wait"
          :headers="headers"
          :items="list"
          item-key="url"
          :hide-default-footer="true"
          class="mt-5 mx-5 pt-2 mb-5 elevation-1"
        >
          <template v-slot:item.short_url="{ item }">
            <a :href="item.short_url" target="_blank">{{item.short_url}}</a>
          </template>
          <template v-slot:item.url="{ item }">
            <a :href="item.url" target="_blank">{{item.url}}</a>
          </template>
        </v-data-table>
      </div>
    </div>
  </v-container>
</template>
<script>
import $url from '../services/url.js'

export default {
  data(){
    return{
      list: [],
      isLoading: false,
      headers: [
        {
          text: "Short Url",
          sortable: false,
          value: "short_url",
        },
        {
          text: "Orignal Url",
          sortable: false,
          value: "url",
        },
        {
          text: "Date",
          sortable: false,
          value: "date",
        }        
      ],
      breadcrumbs: [
        {
          text: 'URL Shortner',
          disabled: false,
          href: '/',
        },
        {
          text: 'Url List',
          disabled: true,
        },
      ],
    }
  },

  
  mounted(){
    this.getLinks();
  },
  methods: {
    getLinks(){
      this.isLoading = true
      $url.getLinks()
      .then(res => {
        var objData = res.data.data
        this.isLoading = false;
        if(objData){
          Object.keys(objData).forEach((key) => {
            this.list.push(objData[key]);
          });
        }
      })
      .catch(error => {
        alert(error)
      })
    },
  }
};
</script>

<style scoped>
  .background-div {
    height: -webkit-fill-available;
    background-color: white !important;
  }
</style> 
