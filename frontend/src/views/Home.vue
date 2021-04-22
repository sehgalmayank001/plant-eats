<template>
  <v-container id="integration" ref="container" fluid>
    <v-btn class="float-right mx-2" :to="{name: 'urlList'}" dark>List</v-btn>
    <section>
        <v-text-field
          id="url"
          v-model="url"
          outlined
          class="mx-2"
        ></v-text-field>
      <v-row class="mx-2">
        <v-checkbox
          v-model="shortUrl"
          label="Shorten URL">
        </v-checkbox>
      </v-row>
      <v-row class="float-right mx-2">
        <div>
          <v-btn outlined class="ma-2" @click=" url = '' ">cancel</v-btn>
          <v-btn outlined color="indigo"  @click=" url ? copyUrl() : '' ">Copy</v-btn>
        </div>
      </v-row>
    </section>
  </v-container>
</template>

<script>
import $url from '../services/url.js'
import { BitlyClient } from 'bitly';

export default {
  name: "Home",
  data() {
    return {
      shortUrl: false,
      url: ''
    };
  },
  methods:{
    async cutUrl(){
      const bitly = new BitlyClient('e351fccd964531138d33cc4de813beccee101f60', {});
      let result;
      let orignalLink = this.url;
      result = await bitly.shorten(this.url);
      if(result){
        this.url = result.link;
        this.uploadUrl(result.link, orignalLink);
      }
    },
    uploadUrl(link, orgLink){
      let payload = { 'short_url': link, url: orgLink, date: new Date()}
      $url.addLink(payload).then(() => {
        alert('short url uploaded successfully')
      })
      .catch(() => {
        alert('short url uploading failed')
      })
    },
    copyUrl() {
      const r = document.createRange()
      r.selectNode(document.querySelector('#url'));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(r);
      document.execCommand('copy');
      window.getSelection().removeAllRanges();
      alert('url copied');
    },
  },
  watch: {
    shortUrl(){
      if(this.shortUrl){
        this.cutUrl();
      }
    }
  }
};
</script>
