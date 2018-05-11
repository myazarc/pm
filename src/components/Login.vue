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
            </v-form>
            </v-container>
                    <v-btn block color="primary" large dark @click.stop="userExist()">GİRİŞ YAP</v-btn>
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
      pass: '',
      snackbarMessage: '',
      snackbar: false,
    };
  },
  methods: {
    userExist() {
      /** console.log(FingerprintAuth);
        FingerprintAuth.isAvailable(function (result) {
        console.log("FingerprintAuth available: " + JSON.stringify(result));
        if (result.isAvailable) {
            var encryptConfig = {}; // See config object for required parameters
            //FingerprintAuth.encrypt(encryptConfig, encryptSuccessCallback, encryptErrorCallback);
        }
      }, function (message) {
          console.log("isAvailableError(): " + message);
      });
        return;
      */
      const self = this;
      window.db.transaction((tx) => {
        tx.executeSql('SELECT count(*) AS mycount FROM USERS WHERE USERPASS=?', [self.pass], (tx, rs) => {
          if (parseInt(rs.rows.item(0).mycount, 10) === 0) {
            self.snackbarMessage = 'Parola Yanlış!';
            self.snackbar = true;
          } else {
            self.$router.push({
              path: '/passlist/',
            });
          }
        }, () => {
          self.snackbarMessage = 'Bir hata oluştu!';
          self.snackbar = true;
        });
      });
    },
  },
};
</script>