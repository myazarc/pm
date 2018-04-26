<template>
<div>
 
 
  <m-toolbar title="Parolalar">
    <v-spacer></v-spacer>
    <v-btn icon to="/passadd/0/">
              <v-icon large>add_circle</v-icon>
            </v-btn>
  </m-toolbar>
  <m-content>
    <v-container fill-height fluid>
    <v-layout row>
      <v-flex xs12 sm12>
        <v-card>

          <v-list two-line>
            <template v-for="(item, index) in items">

              <v-divider v-if="item.divider" :inset="item.inset" :key="index"></v-divider>
              <v-list-tile avatar v-else :key="item.title" @click="openDialog()">
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>

          </v-card>
      </v-flex>
    </v-layout>
    </v-container>
  </m-content>
  

     <v-dialog v-model="dialog1" max-width="500px" :persistent="true">
          <v-card>
            <v-card-media src="http://www.forumistanbul.com.tr/media/image/garanti.jpg" height="150px">
            <v-layout column class="media">
              <v-card-title>
                <v-btn icon fab dark small color="primary" @click.stop="dialog1 = false">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn fab dark small color="pink" icon class="mr-3">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn fab dark small color="red" icon>
                  <v-icon>close</v-icon>
                </v-btn>
              </v-card-title>
       
            </v-layout>
          </v-card-media>

            <v-card-text>
                <div class="subheading-1 pl-2">Parola Adı: <span class="title">Garanti Mobil Şube</span></div>
                <div class="subheading-1 pl-2">Parola: <span class="title">title</span></div>
                <div class="subheading-1 pl-2 ">
                  Açıklama: Lorem ipsum dolor sit amet.</div>



                     

            </v-card-text>

          </v-card>
        </v-dialog>
    
</div>
</template>

<script>
export default {
  data() {
    return {
      dialog1: false,
      items: [
        { header: 'Today' },
        { avatar: 'http://www.forumistanbul.com.tr/media/image/garanti.jpg', title: 'Brunch this weekend?', subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { divider: true, inset: true },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend." },
        { divider: true, inset: true },
        { avatar: 'https://vuetifyjs.com/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?" },
      ],
    };
  },
  methods: {
    openDialog() {
      this.dialog1 = true;
    },
  },
  created() {
    /* eslint-disable */
     window.db.transaction(function(tx) {
      tx.executeSql('SELECT count(*) AS mycount FROM DemoTable', [], function(tx, rs) {
        alert(rs.rows.item(0).mycount);
      }, function(tx, error) {
        console.log('SELECT error: ' + error.message);
      });
    });
  },
};
</script>
