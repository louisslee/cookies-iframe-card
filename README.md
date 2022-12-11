# Cookies Iframe Card

There's a home-assitant Lovalace UI card, which is simlar with HA original iframe card functionally. After adding this iframe card in Lovelace UI, it will gets supervisor ingress cookies when loaded in home-assitant frontend.

The card could be useful if you want add some webpages in Home-assistant addons, such as Grafana. You'll get "401 unauthorized" if the original iframe card was used, because home-assistant supervisor ingress cookies was not attached (discussion can be found [here](https://github.com/home-assistant/frontend/discussions/11273)). This card is designed for solving issue like that!

## Install
 
The recommendation for install is to use HACS. 

However, you can copy all files in `/dist` directory of this repo to `<config directory>/www/` path in your home-assistant instance directly, and registering them in HA frontend ([Instruction](https://developers.home-assistant.io/docs/frontend/custom-ui/registering-resources)).


## Usage

I try my best to make it perform as original iframe card, so thers's almost no difference on usage.
