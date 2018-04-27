<template>
<div>
 
 
  <m-toolbar title="Parola Ekle">

  </m-toolbar>
  <m-content>
    <v-container fill-height fluid>
    <v-layout row>
      <v-flex sm12>
         <v-card>
           <v-card-text>
         <v-form>

           <file-input v-model="file" accept="image/*" @files="filesmi">

           </file-input>
           <img :src="file64" width="100%">
          <v-text-field
            label="Parola Adı"
            v-model="name"
            required
          ></v-text-field>
              <v-layout row>
 
          <v-flex sm12>
          <v-text-field
            label="Parola"
            v-model="pass"
            required
          ></v-text-field>
          </v-flex>
                     <v-flex x1 class="pt-3">
    <v-btn dark color="orange" @click.stop="passGenerate()">Üret</v-btn>
   </v-flex>
                        </v-layout>

          <v-text-field
            label="Açıklama"
            v-model="desc"
            textarea
          ></v-text-field>
        </v-form>
        </v-card-text>
        <v-card-actions >
          <v-spacer></v-spacer>
                   <v-btn depressed color="error" to="/passlist/">Vazgeç</v-btn>
                  <v-btn depressed color="primary" @click.stop="save()">Kaydet</v-btn>

        </v-card-actions>
         </v-card>
      </v-flex>
    </v-layout>
    </v-container>
  </m-content>
  
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
import Vue from 'vue';

import FileInput from './helpers/FileInput';

Vue.component('file-input', FileInput);

export default {
  data() {
    return {
      file: '',
      file64: '',
      name: '',
      pass: '',
      desc: '',
      snackbarMessage: '',
      snackbar: false,
    };
  },
  mounted() {
    const id = parseInt(this.$route.params.id, 10) || 0;
    const self = this;
    if (id > 0) {
      /* eslint-disable */
      window.db.transaction((tx) => {
        tx.executeSql('SELECT * FROM PASSWORDS WHERE ID=?', [id], function(tx, rs) {
          const data=rs.rows.item(0);
          self.file = data.IMAGENAME;
          self.file64 = data.IMAGE;
          self.name = data.PASSNAME;
          self.desc = data.PASSDESC;
          self.pass = data.PASSWORD;
        }, function(tx, error) {
          console.log('SELECT error: ' + error.message);
        });
      });
    }
  },
  methods: {
    filesmi(files) {
      const self = this;
      const reader = new FileReader();


      reader.onload = (e) => {
        self.file64 = e.target.result;
      };

      reader.readAsDataURL(files[0]);
    },
    save() {
      if (this.name === '' || this.pass === '' || this.file64 === '') {
        this.snackbarMessage = 'Form boş geçilemez!';
        this.snackbar = true;
      } else {
        const id = parseInt(this.$route.params.id, 10) || 0;
        const self = this;
        window.db.transaction((tx) => {
          if (id === 0) {
            tx.executeSql('INSERT INTO PASSWORDS (PASSNAME,PASSWORD,PASSDESC,IMAGE,IMAGENAME) VALUES (?,?,?,?,?)', [self.name, self.pass, self.desc, self.file64, self.file], () => {
              self.$router.push({
                path: '/passlist/',
              });
            }, () => {
              self.snackbarMessage = 'Bir sorun oluştu!';
              self.snackbar = true;
            });
          } else {
            tx.executeSql('UPDATE PASSWORDS SET PASSNAME=?,PASSWORD=?,PASSDESC=?,IMAGE=?,IMAGENAME=? WHERE ID=?', [self.name, self.pass, self.desc, self.file64, self.file, id], () => {
              self.$router.push({
                path: '/passlist/',
              });
            }, () => {
              self.snackbarMessage = 'Bir sorun oluştu!';
              self.snackbar = true;
            });
          }
        });
      }
    },
    passGenerate() {
      const length = 10;
      const string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
      const numeric = '0123456789';
      const punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
      let password = "";
      let character = "";
      let crunch = true;
      let entity1 = "";
      let entity2 = "";
      let entity3 = "";
      let hold = "";
      while( password.length < length ) {
          entity1 = Math.ceil(string.length * Math.random()*Math.random());
          entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
          entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
          hold = string.charAt( entity1 );
          hold = (entity1%2==0)?(hold.toUpperCase()):(hold);
          character += hold;
          character += numeric.charAt( entity2 );
          character += punctuation.charAt( entity3 );
          password = character;
      }
      this.pass=password;
    },
  },
};
</script>
