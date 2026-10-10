<template>
  <div class='footer-wrapper'>
    <footer class='footers container'>
      <div class='footer__content-desktop-block'>
        <div class='footer__content-group'>
          <ul class='footer__links-list'>
            <li class='footer__links-list-item'>
              <div style='cursor:pointer;'>
                <span @click='handleLicencia("help")'> {{ $t('assist') }}</span>
              </div>
            </li>
            <li class='footer__links-list-item'>
              <div style='cursor:pointer;'>
                <span @click='handleLicencia("about_us")'> {{ $t('about-us') }}</span>
              </div>
            </li>
            <li class='footer__links-list-item'>
              <p @click='handleLicencia("rotten_tomatoes")' style='cursor: pointer' data-qa='footer:link-whats-tmeter'>
                {{ $t('tomatometer') }}<sup></sup></p>
            </li>
          </ul>
        </div>
        <div class='footer__content-group'>
          <ul class='footer__links-list'>
            <li class='footer__links-list-item'>
              <div style='cursor:pointer;'>
                <span @click='handleLicencia("permission")'>{{ $t('permission') }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class='footer__content-group footer__social-block' data-qa='footer:social'>
          <ul class='footer__links-list list-inline' style='display:flex;'>
            <li v-for='(item,index) in list' :key='index' class='footer__links-list-item' v-if='item.key=="Telegram"'
                style='width: auto'>
              <div style='width: 20px;cursor:pointer;'>
                <a :href="item.val" target="_blank">
                  <img style="width: 100%;" src="@/assets/img/tem.png"/>
                </a>
                <!--                <svg style='color: #fff;fill: #fff' v-if='index==2'-->
                <!--                     xmlns='http://www.w3.org/2000/svg' viewBox='0 0 27 32'>-->
                <!--                  <path-->
                <!--                    d='M0 24.576V7.424q0-2.112 1.504-3.616t3.648-1.536h17.12q2.144 0 3.648 1.536t1.504 3.616v17.152q0 2.112-1.504 3.616t-3.648 1.536h-3.424v-10.88h3.648l.512-4h-4.16v-2.56q0-.96.512-1.472t1.696-.512l2.368-.032v-3.68q-1.696-.16-3.2-.16-2.432 0-3.904 1.44t-1.472 4.032v2.944h-4v4h4v10.88H5.152q-2.144 0-3.648-1.536T0 24.576z'></path>-->
                <!--                </svg>-->
                <!--                <svg style='color: #fff;fill: #fff' v-if='index==1'-->
                <!--                     xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 32'>-->
                <!--                  <path-->
                <!--                    d='M.8 24.832q.608.064 1.376.064 4.032 0 7.168-2.464-1.888-.032-3.36-1.152t-2.048-2.848q.608.096 1.088.096.768 0 1.536-.192-2.016-.416-3.328-1.984t-1.312-3.68v-.064q1.216.672 2.624.736-1.184-.8-1.888-2.048t-.704-2.752q0-1.568.8-2.912Q4.896 8.288 8 9.888t6.656 1.76q-.16-.672-.16-1.312 0-2.4 1.696-4.064t4.064-1.696q2.496 0 4.224 1.824 1.952-.384 3.648-1.408-.64 2.048-2.528 3.2 1.664-.192 3.328-.896-1.184 1.728-2.88 2.976v.736q0 2.336-.672 4.64t-2.048 4.448-3.296 3.744-4.608 2.624-5.792.96Q4.8 27.424.8 24.832z'></path>-->
                <!--                </svg>-->
              </div>

            </li>

          </ul>
        </div>
      </div>
      <div class='footer__copyright'>
        <ul class='footer__links-list list-inline list-inline--separator'
            data-qa='footer:links-list-privacy'>
          <li class='footer__links-list-item'>
            <div style='cursor:pointer;'>
              <span @click='handleLicencia("privacy_policy")'>{{ $t('privacy-policy') }}</span>
            </div>
          </li>
          <li class='footer__links-list-item'>
            <span @click='handleLicencia("terms_and_policies")' style='cursor: pointer'>{{
                $t('terms-and-conditions')
              }}</span>
          </li>
          <li class='footer__links-list-item'>
            <img
              src='https://images.fandango.com/cms/assets/266533e0-7afb-11ed-83f2-4f600722b564--privacyoptions.svg'
              class='footer__ccpa-icon' style='margin-right: 5px;' loading='lazy' alt='CCPA icon'>
            <!-- OneTrust Cookies Settings button start -->
            <span @click='handleLicencia("cookie_notice")' class='ot-sdk-show-settings'
                  style='cursor: pointer'> {{ $t('cookie-notification') }}</span>
            <!-- OneTrust Cookies Settings button end -->
          </li>
        </ul>
        <span class='footer__copyright-legal'
              data-qa='footer:copyright'>  {{
            $t('all-rights-reserved')
          }} © Fandango. {{ $t('all-rights-reserved') }}</span>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          'id': '',
          'key': '',
          'val': '',
          'remark': '',
          'add_time': '2023-08-26 15:40:21',
          'save_time': '2023-08-27 21:02:21'
        },
        {
          'id': '',
          'key': '',
          'val': '',
          'remark': '',
          'add_time': '2023-08-26 15:39:57',
          'save_time': '2023-08-27 21:02:04'
        },
        {
          'id': '',
          'key': '',
          'val': '',
          'remark': '',
          'add_time': '2023-08-26 15:39:13',
          'save_time': '2023-08-26 15:39:15'
        },
        {
          'id': '',
          'key': 'he',
          'val': '',
          'remark': '',
          'add_time': '2023-08-26 15:38:33',
          'save_time': '2023-08-26 15:38:36'
        },
        {
          'id': '',
          'key': '',
          'val': '',
          'remark': '',
          'add_time': '2023-08-26 15:37:59',
          'save_time': '2023-08-26 15:38:03'
        },
        {
          'id': '',
          'key': '',
          'val': '',
          'remark': '',
          'add_time': '2023-08-26 15:37:29',
          'save_time': '2023-08-26 15:37:32'
        }
      ]
    };
  },
  computed: {},
  methods: {
    getData() {
      this.$http.home.configList({}).then(res => {
        if (res.code == 200) {
          this.list = res.data.items;
        }
      }).catch(err => {
      }).finally(() => {
      });
    },
    handleHelp() {
      this.$router.push('/help');
    },
    handleAbout() {
      this.$router.push('/about');
    },
    handleClause() {
      this.$router.push('/clause');
    },
    handleCookie() {
      this.$router.push('/cookie');
    },
    handleTomatometer() {
      this.$router.push('/tomatometer');
    },
    handleLicencia(val) {
      this.$router.push({path: '/licencia', query: {'key': val}});
    },
    handlePrivacy() {
      this.$router.push('/privacy');
    },
  },
  mounted() {
    this.getData()
  }
};
</script>
<style scoped lang='scss'>
.footer-wrapper {
  background-color: #fff;
  display: block;
  color: #000;
  width: 100%;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
  .container {
    margin: 0 auto;
    background-color: #fff;
    border: none;
  }

  .footers {
    padding: 0 0.24rem;

    .footer__content-desktop-block {
      display: flex;
      justify-content: space-between;

      .footer__content-group-title {
        margin-bottom: 10px;
        font-size: 1.125rem;
        text-transform: uppercase;
      }

      .footer__social-block {
        .footer__links-list {
          //display: flex;

          .footer__links-list-item {
            //font-size: 14px;
            width: 20px;
          }
        }

      }

      .footer__content-group {
        padding: 20px 0;

        .footer__links-list {
          padding: 0;
          margin-left: -5px;

          .footer__links-list-item {
            list-style: none;
            margin-bottom: 0;
            padding: 2px 5px;
            line-height: 24px;

            a {
              color: #fff;
              fill: #FFFFFF;
            }
          }
        }
      }
    }

    .footer__copyright {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 20px;

      .footer__links-list {
        padding: 0;
        margin-left: -5px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;

        .dele {
          content: "|";
          display: inline-block;
          color: #505257;
          margin-left: 10px;
          margin-right: 10px;
        }

        .footer__links-list-item {
          margin-bottom: 0;
          padding: 2px 5px;
          list-style: none;


          .footer__ccpa-icon {
            display: inline-block;
            width: 30px;
          }

          a {
            color: #fff;
            fill: #FFFFFF;
            line-height: 1.375rem;
          }
        }
      }
    }
  }
}

#mobile {
  .container {
    padding: 20px;
  }

  .footer__social-block {
    text-align: right;
  }

  .footer__links-list {
    margin-bottom: 0;
    justify-content: flex-end;
  }
}
</style>
