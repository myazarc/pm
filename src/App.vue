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
        // Handle the device ready event.
        this.cordova.on('pause', this.onPause, false);
        this.cordova.on('resume', this.onResume, false);
        if (this.cordova.device.platform === 'Android') {
          document.addEventListener('backbutton', this.onBackKeyDown, false);
        }
        window.db = window.sqlitePlugin.openDatabase({name: 'demo.db', key: 'your-password-here', location: 'default'});
        window.db.transaction((tx) => {
          tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
          tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
          tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
        }, function(error) {
          console.log('Transaction ERROR: ' + error.message);
        }, function() {
          console.log('Populated database OK');
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

