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
         <v-form v-model="valid">
          <v-text-field
            label="Parola Adı"
            v-model="name"
            required
          ></v-text-field>
              <v-layout row>
 
          <v-flex sm12>
          <v-text-field
            label="Parola"
            v-model="email"
            required
          ></v-text-field>
          </v-flex>
                     <v-flex x1 class="pt-3">
    <v-btn dark color="orange">Üret</v-btn>
   </v-flex>
                        </v-layout>

          <v-text-field
            label="Açıklama"
            v-model="emai2l"
            textarea
          ></v-text-field>
        </v-form>
        </v-card-text>
        <v-card-actions >
          <v-spacer></v-spacer>
                   <v-btn depressed color="error" to="/passlist/">Vazgeç</v-btn>
                  <v-btn depressed color="primary" >Kaydet</v-btn>

        </v-card-actions>
         </v-card>
      </v-flex>
    </v-layout>
    </v-container>
  </m-content>
  

    
</div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>
