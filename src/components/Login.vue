<template>
  <v-container fluid fill-height>
    <v-layout  align-center>
      <v-flex sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
                                          <div class="headline mb-0" style="text-align:center">Password Manager <small v-text="version"></small></div>


            <v-form v-model="valid">
              <v-text-field
                label="Parola"
                v-model="name"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                dark
              ></v-text-field>
            </v-form>
            </v-container>
                    <v-btn block color="primary" large dark to="/passlist/">GİRİŞ YAP</v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  data() {
    return {
      e1: true,
      name: '',
      version: 'MYC',
    };
  },
};
</script>