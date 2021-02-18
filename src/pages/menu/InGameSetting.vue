<template>
<v-dialog v-model="setting">
<div>
    <v-app-bar flat color="#495689" dark>
        <v-spacer />
        {{'SETTINGS'}}
        <v-spacer></v-spacer>
        <v-btn icon @click="$emit('close')">
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </v-app-bar>
    <v-list>
        <v-list-item style="height:66px">
            음향효과<v-spacer></v-spacer>
            <v-switch inset :input-value="soundEffect" @change="$store.dispatch('toggleSoundSetting')"></v-switch>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item style="height:66px">
            진동효과<v-spacer></v-spacer>
            <v-switch inset :input-value="viberateEffect" @change="$store.dispatch('toggleVibrateSetting')"></v-switch>
        </v-list-item>
    </v-list>

</div>
</v-dialog>
</template>

<script>
import Settings from '@/pages/menu/settings'
export default {
    extends:Settings,
    props:[
        'setting'

    ]
}
</script>

