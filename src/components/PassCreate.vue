<template>
  <v-container fluid fill-height>
    <v-layout  align-center>
      <v-flex sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
                                          <div class="headline mb-0" style="text-align:center">Password Manager</div>


            <v-form v-model="valid">
              <v-text-field
                label="Parola"
                v-model="pass"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                dark
              ></v-text-field>
              <v-text-field
                label="Parola Tekrarı"
                v-model="passrepeat"
                :append-icon="e2 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e2 = !e2)"
                :type="e2 ? 'password' : 'text'"
                dark
              ></v-text-field>
            </v-form>
            </v-container>
                    <v-btn block color="primary" large dark @click.stop="createPass()">Parola Oluştur</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar
        :timeout="2500"
        :top="true"
        v-model="snackbar"
      >
        {{ snackbarMessage }}
        <v-btn flat color="pink" @click.native="snackbar = false">KAPAT</v-btn>
      </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      e1: true,
      e2: true,
      pass: '',
      passrepeat: '',
      snackbarMessage: '',
      snackbar: false,
    };
  },
  methods: {
    createPass() {
      const self = this;
      if (self.pass.length < 4) {
        self.snackbarMessage = 'Parola En Az 4 Karakter Olmalı!';
        self.snackbar = true;
        return;
      }

      if (self.pass !== self.passrepeat) {
        self.snackbarMessage = 'Parolanız uyuşmuyor!';
        self.snackbar = true;
        return;
      }

      window.db.transaction((tx) => {
        tx.executeSql('INSERT INTO USERS (USERPASS) VALUES (?)', [self.pass], () => {
          self.$router.push({
            path: '/',
          });
        }, () => {
          self.snackbarMessage = 'Bir sorun oluştu!';
          self.snackbar = true;
        });
      });
    },
  },
};
</script>