import Vue from 'vue'
import Alert from '@/components/common/alerts/Alert'
import { mapGetters, mapMutations } from 'vuex'

Vue.mixin({
  components: {
    Alert,
  },
  computed: {
    ...mapGetters(['loadingButton', 'loadingInput', 'loadingTable', 'loadingSkeleton', 'loadingSkeletonHeader', 'alertNotification', 'userAvatar', 'getAside', 'validateSocket']),
  },
  methods: {
    ...mapMutations(['clearAlertNotification', 'setLoadingTable', 'setLoadingButton', 'setLoadingSkeleton', 'setLoadingSkeletonHeader', 'setTheme', 'setAside']),
  },
})
