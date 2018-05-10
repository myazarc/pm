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
              <v-list-tile avatar :key="item.ID" @click="openDialog(index)">
                <v-list-tile-avatar>
                  <img :src="item.IMAGE">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.PASSNAME"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="item.PASSDESC"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :inset="true" :key="index"/>
            </template>
          </v-list>

          </v-card>
      </v-flex>
    </v-layout>
    </v-container>
  </m-content>
  

     <v-dialog v-model="dialog1" max-width="500px">
          <v-card>
            <v-card-media :src="selected.IMAGE" height="150px">
            <v-layout column class="media">
              <v-card-title>
                
                <v-btn icon fab dark small color="primary" @click.stop="dialog1 = false">
                  <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon fab dark right small color="orange" @click.stop="copyPass()">
                  <v-icon>content_copy</v-icon>
                </v-btn>
                <v-btn fab dark small color="pink" icon class="mr-3" :to="`/passadd/${selected.ID}/`">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn fab dark small color="red" @click="removeDialog()" icon>
                  <v-icon>close</v-icon>
                </v-btn>
              </v-card-title>
       
            </v-layout>
          </v-card-media>

            <v-card-text>
                <div class="subheading-1 pl-2">Parola Adı: <span class="title">{{ selected.PASSNAME }}</span></div>
                <div class="subheading-1 pl-2">Parola: <span class="title">{{ selected.PASSWORD }}</span> 
                  
                </div>
                <div class="subheading-1 pl-2 ">{{ selected.PASSDESC }}</div>



                     

            </v-card-text>

          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog2" max-width="500px">
          <v-card>
            <v-card-title>
              Silmek istediğinize emin misiniz?
            </v-card-title>
            <v-card-text>


                      <v-btn depressed large color="red" block="true" @click.stop="removeRow()" style="text-transform:none">Evet</v-btn>
                      <v-btn depressed large color="blue" block="true" @click.stop="dialog2 = !dialog1" style="text-transform:none">Hayır</v-btn>
                      

            </v-card-text>

          </v-card>
        </v-dialog>

        <v-snackbar
        :timeout="2500"
        :top="true"
        v-model="snackbar"
      >
        {{ snackbarMessage }}
        <v-btn flat color="pink" @click.native="snackbar = false">KAPAT</v-btn>
      </v-snackbar>
    
</div>
</template>

<script>
export default {
  data() {
    return {
      dialog1: false,
      dialog2: false,
      items: [],
      selected: {},
      snackbarMessage: '',
      snackbar: false,
    };
  },
  methods: {
    copyPass() {
      window.cordova.plugins.clipboard.copy(this.selected.PASSWORD);
      this.snackbarMessage = 'Parola Kopyalandı!';
      this.snackbar = true;
    },
    openDialog(index) {
      this.selected = this.items[index];
      this.dialog1 = true;
    },
    removeDialog() {
      this.dialog2 = true;
    },
    removeRow() {
      const self = this;
      const id = this.selected.ID;
      this.dialog2 = false;
      this.dialog1 = false;
      /* eslint-disable */
      window.db.transaction(function(tx) {
        tx.executeSql('DELETE FROM PASSWORDS WHERE ID=?', [id], function(tx, rs) {
          self.getAllPass();
        }, function(tx, error) {
          console.log('SELECT error: ' + error.message);
        });
      });
    },
    getAllPass() {
      const self = this;
      /* eslint-disable */
      window.db.transaction(function(tx) {
        self.items = [];
        tx.executeSql('SELECT * FROM PASSWORDS', [], function(tx, rs) {
          for (let i=0;i<rs.rows.length;i++) {
            self.items.push(rs.rows.item(i));
          }
        }, function(tx, error) {
          console.log('SELECT error: ' + error.message);
        });
      });
    },
  },
  mounted() {
    this.getAllPass();
  },
};
</script>
