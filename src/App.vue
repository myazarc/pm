<template>

  <v-app id="inspire" dark>
    <router-view></router-view>
  </v-app>
  
</template>

<script>
  import Vue from 'vue';
  export default {
    data() {
      return {
        cordova: Vue.cordova,
      };
    },
    created() {
      const self = this;
      this.cordova.on('deviceready', () => {
        self.onDeviceReady();
      });
    },
    methods: {
      onDeviceReady() {
        const self=this;
        // Handle the device ready event.
        this.cordova.on('pause', this.onPause, false);
        this.cordova.on('resume', this.onResume, false);
        if (this.cordova.device.platform === 'Android') {
          document.addEventListener('backbutton', this.onBackKeyDown, false);
        }
        window.db = window.sqlitePlugin.openDatabase({name: 'PassMan.db', key: '929b39b2ab0e9ccb9204b', location: 'default'});
        window.db.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS USERS (ID INTEGER PRIMARY KEY AUTOINCREMENT, USERPASS TEXT NOT NULL)');
          tx.executeSql('CREATE TABLE IF NOT EXISTS PASSWORDS (ID INTEGER PRIMARY KEY AUTOINCREMENT, PASSNAME TEXT NOT NULL,PASSWORD TEXT NOT NULL, PASSDESC TEXT, IMAGE TEXT, IMAGENAME TEXT)');
        }, function(error) {
          console.log('Transaction ERROR: ' + error.message);
        }, function() {
          window.db.transaction(function(tx) {
            tx.executeSql('SELECT count(*) AS mycount FROM USERS', [], function(tx, rs) {
              if (rs.rows.item(0).mycount<1) {
                self.$router.push({
                  path: '/passcreate/',
                });
              }
            }, function(tx, error) {
              console.log('SELECT error: ' + error.message);
            });
          });
        });
      },
      onPause() {
        // Handle the pause lifecycle event.
        console.log('pause');
      },
      onResume() {
        // Handle the resume lifecycle event.
        // SetTimeout required for iOS.
        setTimeout(() => {
          console.log('resume');
        }, 0);
      },
      onBackKeyDown() {
        // Handle the back-button event on Android. By default it will exit the app.
        navigator.app.exitApp();
      },
    },
  };
</script>

<style>
html{
  overflow: auto;
}
	body {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
	}
  .footer{ /* Apply this to v-bottom-nav if necessary. */
    margin-bottom: constant(safe-area-inset-bottom);
    margin-bottom: env(safe-area-inset-bottom);
  }
</style>

