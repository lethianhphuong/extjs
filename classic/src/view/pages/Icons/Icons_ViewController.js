Ext.define('DEMO.view.pages.Icons.Icons_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.icons',

    // ── Icon name data (comma-separated per group) ──
    statics: {
        solidNames: 'accessible-icon,acquisitions-incorporated,ad,address-book,address-book-o,address-card,adjust,adn,air-freshener,align-center,align-justify,align-left,align-right,allergies,ambulance,american-sign-language-interpreting,amilia,anchor,android,angle-double-down,angle-double-left,angle-double-right,angle-double-up,angle-down,angle-left,angle-right,angle-up,angry,angrycreative,angular,ankh,app-store,app-store-ios,apper,apple,apple-alt,archive,archway,arrow-alt-circle-down,arrow-alt-circle-left,arrow-alt-circle-right,arrow-alt-circle-up,arrow-circle-down,arrow-circle-left,arrow-circle-right,arrow-circle-up,arrow-down,arrow-left,arrow-right,arrow-up,arrows-alt,arrows-alt-h,arrows-alt-v,assistive-listening-systems,asterisk,at,atlas,atom,audio-description,award,aws,baby,baby-carriage,backspace,backward,bacon,bacteria,bacterium,bahai,balance-scale,balance-scale-left,balance-scale-right,ban,band-aid,barcode,bars,baseball-ball,basketball-ball,bath,battery-empty,battery-full,battery-half,battery-quarter,battery-three-quarters,battle-net,bed,beer,bell,bell-slash,bezier-curve,bible,bicycle,biking,binoculars,biohazard,birthday-cake,blender,blender-phone,blind,blog,bold,bolt,bomb,bone,bong,book,book-dead,book-medical,book-open,book-reader,bookmark,border-all,border-none,border-style,bowling-ball,box,box-open,box-tissue,boxes,braille,brain,bread-slice,briefcase,briefcase-medical,broadcast-tower,broom,brush,btc,bug,building,bullhorn,bullseye,burn,bus,bus-alt,business-time,buy-n-large,calculator,calendar,calendar-alt,calendar-check,calendar-day,calendar-minus,calendar-plus,calendar-times,calendar-week,camera,camera-retro,campground,candy-cane,cannabis,capsules,car,car-alt,car-battery,car-crash,car-side,caravan,caret-down,caret-left,caret-right,caret-square-down,caret-square-left,caret-square-right,caret-square-up,caret-up,carrot,cart-arrow-down,cart-plus,cash-register,cat,certificate,chair,chalkboard,chalkboard-teacher,charging-station,chart-area,chart-bar,chart-line,chart-pie,check,check-circle,check-double,check-square,cheese,chess,chess-bishop,chess-board,chess-king,chess-knight,chess-pawn,chess-queen,chess-rook,chevron-circle-down,chevron-circle-left,chevron-circle-right,chevron-circle-up,chevron-down,chevron-left,chevron-right,chevron-up,child,church,circle,circle-notch,city,clinic-medical,clipboard,clipboard-check,clipboard-list,clock,clone,closed-captioning,cloud,cloud-download-alt,cloud-meatball,cloud-moon,cloud-moon-rain,cloud-rain,cloud-showers-heavy,cloud-sun,cloud-sun-rain,cloud-upload-alt,cocktail,code,code-branch,coffee,cog,cogs,coins,columns,comment,comment-alt,comment-dollar,comment-dots,comment-medical,comment-slash,comments,comments-dollar,compact-disc,compass,compress,compress-alt,compress-arrows-alt,concierge-bell,cookie,cookie-bite,copy,copyright,cotton-bureau,couch,creative-commons-by,creative-commons-nc,creative-commons-nc-eu,creative-commons-nc-jp,creative-commons-nd,creative-commons-pd,creative-commons-pd-alt,creative-commons-remix,creative-commons-sa,creative-commons-sampling,creative-commons-sampling-plus,creative-commons-share,creative-commons-zero,credit-card,crop,crop-alt,cross,crosshairs,crow,crown,crutch,cube,cubes,cut,database,deaf,democrat,desktop,dharmachakra,dhl,diagnoses,dice,dice-d20,dice-d6,dice-five,dice-four,dice-one,dice-six,dice-three,dice-two,digital-tachograph,directions,disease,divide,dizzy,dna,dog,dollar-sign,dolly,dolly-flatbed,donate,door-closed,door-open,dot-circle,dove,download,drafting-compass,dragon,draw-polygon,drum,drum-steelpan,drumstick-bite,dumbbell,dumpster,dumpster-fire,dungeon,edit,egg,eject,ellipsis-h,ellipsis-v,envelope,envelope-open,envelope-open-text,envelope-square,equals,eraser,ethernet,euro-sign,exchange-alt,exclamation,exclamation-circle,exclamation-triangle,expand,expand-alt,expand-arrows-alt,external-link-alt,external-link-square-alt,eye,eye-dropper,eye-slash,fan,fast-backward,fast-forward,faucet,fax,feather,feather-alt,female,fighter-jet,file,file-alt,file-archive,file-audio,file-code,file-contract,file-csv,file-download,file-excel,file-export,file-image,file-import,file-invoice,file-invoice-dollar,file-medical,file-medical-alt,file-pdf,file-powerpoint,file-prescription,file-signature,file-upload,file-video,file-word,fill,fill-drip,film,filter,fingerprint,fire,fire-alt,fire-extinguisher,first-aid,fish,fist-raised,flag,flag-checkered,flag-usa,flask,flushed,folder,folder-minus,folder-open,folder-plus,font,football-ball,forward,frog,frown,frown-open,funnel-dollar,futbol,gamepad,gas-pump,gavel,gem,genderless,ghost,gift,gifts,glass-cheers,glass-martini,glass-martini-alt,glass-whiskey,glasses,globe,globe-africa,globe-americas,globe-asia,globe-europe,golf-ball,gopuram,graduation-cap,greater-than,greater-than-equal,grimace,grin,grin-alt,grin-beam,grin-beam-sweat,grin-hearts,grin-squint,grin-squint-tears,grin-stars,grin-tears,grin-tongue,grin-tongue-squint,grin-tongue-wink,grin-wink,grip-horizontal,grip-lines,grip-lines-vertical,grip-vertical,h-square,hamburger,hammer,hamsa,hand-holding,hand-holding-heart,hand-holding-medical,hand-holding-usd,hand-holding-water,hand-lizard,hand-middle-finger,hand-paper,hand-peace,hand-point-down,hand-point-left,hand-point-right,hand-point-up,hand-pointer,hand-rock,hand-scissors,hand-sparkles,hand-spock,hands,hands-helping,hands-wash,handshake,handshake-alt-slash,handshake-slash,hanukiah,hard-hat,hashtag,hat-cowboy,hat-cowboy-side,hat-wizard,hdd,head-side-cough,head-side-cough-slash,head-side-mask,head-side-virus,heading,headphones,headphones-alt,headset,heart,heart-broken,heartbeat,helicopter,highlighter,hiking,hippo,history,hive,hockey-puck,holly-berry,home,horse,horse-head,hospital,hospital-alt,hospital-symbol,hospital-user,hot-tub,hotdog,hotel,hourglass,hourglass-end,hourglass-half,hourglass-start,house-damage,house-user,hryvnia,i-cursor,ice-cream,icicles,icons,id-badge,id-card,id-card-alt,ideal,igloo,image,images,imdb,inbox,indent,industry,infinity,info,info-circle,italic,jedi,jedi-order,jenkins,joint,journal-whills,kaaba,key,keyboard,khanda,kiss,kiss-beam,kiss-wink-heart,kiwi-bird,landmark,language,laptop,laptop-code,laptop-house,laptop-medical,laugh,laugh-beam,laugh-squint,laugh-wink,layer-group,leaf,lemon,less-than,less-than-equal,level-down-alt,level-up-alt,life-ring,lightbulb,link,lira-sign,list,list-alt,list-ol,list-ul,location-arrow,lock,lock-open,long-arrow-alt-down,long-arrow-alt-left,long-arrow-alt-right,long-arrow-alt-up,low-vision,luggage-cart,lungs,lungs-virus,magic,magnet,mail-bulk,male,map,map-marked,map-marked-alt,map-marker,map-marker-alt,map-pin,map-signs,marker,mars,mars-double,mars-stroke,mars-stroke-h,mars-stroke-v,mask,medal,medkit,medrt,meetup,megaport,meh,meh-blank,meh-rolling-eyes,memory,menorah,mercury,microchip,microphone,microphone-alt,microphone-alt-slash,microphone-slash,microscope,microsoft,minus,minus-circle,minus-square,mitten,mobile,mobile-alt,money-bill,money-bill-alt,money-bill-wave,money-bill-wave-alt,money-check,money-check-alt,monument,moon,mortar-pestle,mosque,motorcycle,mountain,mouse,mouse-pointer,mug-hot,music,network-wired,neuter,newspaper,not-equal,notes-medical,object-group,object-ungroup,oil-can,om,otter,outdent,pager,paint-brush,paint-roller,palette,pallet,paper-plane,paperclip,parachute-box,paragraph,parking,passport,pastafarianism,paste,pause,pause-circle,paw,peace,pen,pen-alt,pen-fancy,pen-nib,pen-square,pencil-alt,pencil-ruler,penny-arcade,people-arrows,people-carry,pepper-hot,perbyte,percent,percentage,person-booth,phone,phone-alt,phone-slash,phone-square,phone-square-alt,phone-volume,photo-video,piggy-bank,pills,pizza-slice,place-of-worship,plane,plane-arrival,plane-departure,plane-slash,play,play-circle,plug,plus,plus-circle,plus-square,podcast,poll,poll-h,poo,poo-storm,poop,portrait,pound-sign,power-off,pray,praying-hands,prescription,prescription-bottle,prescription-bottle-alt,print,procedures,project-diagram,pump-medical,pump-soap,puzzle-piece,qrcode,question,question-circle,quidditch,quinscape,quote-left,quote-right,quran,radiation,radiation-alt,rainbow,random,receipt,record-vinyl,recycle,redo,redo-alt,registered,remove-format,reply,reply-all,republican,restroom,retweet,ribbon,ring,road,robot,rocket,route,rss,ruble-sign,ruler,ruler-combined,ruler-horizontal,ruler-vertical,running,rupee-sign,sad-cry,sad-tear,satellite,satellite-dish,save,school,screwdriver,scroll,sd-card,search,search-dollar,search-location,search-minus,search-plus,seedling,server,shapes,share,share-alt,share-alt-square,share-square,shekel-sign,shield-alt,shield-virus,ship,shipping-fast,shoe-prints,shopping-bag,shopping-basket,shopping-cart,shower,shuttle-van,sign,sign-in-alt,sign-language,sign-out-alt,signal,signature,sim-card,simplybuilt,sink,sistrix,sitemap,sith,skating,sketch,skiing,skiing-nordic,skull,skull-crossbones,skyatlas,slash,sleigh,sliders-h,smile,smile-beam,smile-wink,smog,smoking,smoking-ban,sms,snowboarding,snowflake,snowman,snowplow,soap,socks,solar-panel,sort,sort-alpha-down,sort-alpha-down-alt,sort-alpha-up,sort-alpha-up-alt,sort-amount-down,sort-amount-down-alt,sort-amount-up,sort-amount-up-alt,sort-down,sort-numeric-down,sort-numeric-down-alt,sort-numeric-up,sort-numeric-up-alt,sort-up,spa,space-shuttle,spell-check,spider,spinner,splotch,spray-can,square,square-full,square-root-alt,stamp,star,star-and-crescent,star-half,star-half-alt,star-of-david,star-of-life,step-backward,step-forward,stethoscope,sticky-note,stop,stop-circle,stopwatch,stopwatch-20,store,store-alt,store-alt-slash,store-slash,stream,street-view,strikethrough,stroopwafel,subscript,subway,suitcase,suitcase-rolling,sun,superscript,surprise,swatchbook,swimmer,swimming-pool,synagogue,sync,sync-alt,syringe,table,table-tennis,tablet,tablet-alt,tablets,tachometer-alt,tag,tags,tape,tasks,taxi,teeth,teeth-open,temperature-high,temperature-low,tenge,terminal,text-height,text-width,th,th-large,th-list,the-red-yeti,theater-masks,thermometer,thermometer-empty,thermometer-full,thermometer-half,thermometer-quarter,thermometer-three-quarters,thumbs-down,thumbs-up,thumbtack,ticket-alt,times,times-circle,tint,tint-slash,tired,toggle-off,toggle-on,toilet,toilet-paper,toilet-paper-slash,toolbox,tools,tooth,torah,torii-gate,tractor,trademark,traffic-light,trailer,train,tram,transgender,transgender-alt,trash,trash-alt,trash-restore,trash-restore-alt,tree,trophy,truck,truck-loading,truck-monster,truck-moving,truck-pickup,tshirt,tty,tv,umbrella,umbrella-beach,underline,undo,undo-alt,universal-access,university,unlink,unlock,unlock-alt,upload,usb,user,user-alt,user-alt-slash,user-astronaut,user-check,user-circle,user-clock,user-cog,user-edit,user-friends,user-graduate,user-injured,user-lock,user-md,user-minus,user-ninja,user-nurse,user-plus,user-secret,user-shield,user-slash,user-tag,user-tie,user-times,users,users-cog,users-slash,usps,utensil-spoon,utensils,vector-square,venus,venus-double,venus-mars,vest,vest-patches,vial,vials,video,video-slash,vihara,virus,virus-slash,viruses,voicemail,volleyball-ball,volume-down,volume-mute,volume-off,volume-up,vote-yea,vr-cardboard,walking,wallet,warehouse,watchman-monitoring,water,wave-square,weight,weight-hanging,wheelchair,wifi,wind,window-close,window-maximize,window-minimize,window-restore,wine-bottle,wine-glass,wine-glass-alt,won-sign,wrench,x-ray,yen-sign,yin-yang',

        regularNames: 'address-book,address-card,bell,bookmark,calendar,calendar-alt,check-circle,check-square,clock,comment,comment-alt,comments,copy,credit-card,dot-circle,edit,envelope,envelope-open,eye,eye-slash,file,file-alt,file-archive,file-audio,file-code,file-excel,file-image,file-pdf,file-powerpoint,file-video,file-word,folder,folder-open,frown,frown-open,hand-paper,hand-scissors,hand-peace,hand-point-down,hand-point-left,hand-point-right,hand-point-up,hand-pointer,hand-rock,hand-spock,hdd,heartbeat,history,home,hourglass,hourglass-end,hourglass-half,hourglass-start,id-badge,id-card,image,images,keyboard,lightbulb,list-alt,map,map-marker,meh,meh-blank,meh-rolling-eyes,minus-square,moon,newspaper,object-group,object-ungroup,paper-plane,pause-circle,play-circle,plus-square,question-circle,save,share-square,smile,smile-beam,smile-wink,snowflake,square,star,star-half,sticky-note,stop-circle,sun,thumbs-down,thumbs-up,times-circle,times-square,trash,trash-alt,user,user-circle,window-close,window-maximize,window-minimize,window-restore',

        brandsNames: 'accusoft,adversal,affiliatetheme,airbnb,algolia,alipay,amazon,amazon-pay,angellist,apple-pay,artstation,asymmetrik,atlassian,audible,autoprefixer,avianex,aviato,bandcamp,behance,behance-square,bimobject,bitbucket,bitcoin,bity,black-tie,blackberry,blogger,blogger-b,bluetooth,bluetooth-b,bootstrap,buffer,buromobelexperte,buysellads,canadian-maple-leaf,cc-amazon-pay,cc-amex,cc-apple-pay,cc-diners-club,cc-discover,cc-jcb,cc-mastercard,cc-paypal,cc-stripe,cc-visa,centercode,centos,chrome,chromecast,cloudflare,cloudscale,cloudsmith,cloudversify,codepen,codiepie,confluence,connectdevelop,contao,cpanel,creative-commons,critical-role,css3,css3-alt,cuttlefish,d-and-d,d-and-d-beyond,dailymotion,dashcube,deezer,delicious,deploydog,deskpro,dev,deviantart,diaspora,digg,digital-ocean,discord,discourse,dochub,docker,draft2digital,dribbble,dribbble-square,dropbox,drupal,dyalog,earlybirds,ebay,edge,edge-legacy,elementor,ello,ember,empire,envira,erlang,ethereum,etsy,evernote,expeditedssl,facebook,facebook-f,facebook-messenger,facebook-square,fantasy-flight-games,fedex,fedora,figma,firefox,firefox-browser,first-order,first-order-alt,firstdraft,flickr,flipboard,fly,font-awesome,font-awesome-alt,font-awesome-flag,font-awesome-logo-full,fonticons,fonticons-fi,fort-awesome,fort-awesome-alt,forumbee,foursquare,free-code-camp,freebsd,fulcrum,galactic-republic,galactic-senate,get-pocket,gg,gg-circle,git,git-alt,git-square,github,github-alt,github-square,gitkraken,gitlab,gitter,glide,glide-g,gofore,goodreads,goodreads-g,google,google-drive,google-pay,google-play,google-plus,google-plus-g,google-plus-square,google-wallet,gratipay,grav,gripfire,grunt,guilded,guitar,gulp,hacker-news,hacker-news-square,hackerrank,hips,hire-a-helper,hooli,hornbill,hotjar,houzz,html5,hubspot,innosoft,instagram,instagram-square,instalod,intercom,internet-explorer,invision,ioxhost,itch-io,itunes,itunes-note,java,jira,joget,joomla,js,js-square,jsfiddle,kaggle,keybase,keycdn,kickstarter,kickstarter-k,korvue,laravel,lastfm,lastfm-square,leanpub,less,line,linkedin,linkedin-in,linode,linux,lyft,magento,mailchimp,mandalorian,markdown,mastodon,maxcdn,mdb,medapps,medium,medium-m,mendeley,meteor,microblog,mix,mixcloud,mixer,mizuni,modx,monero,napster,neos,nimblr,node,node-js,npm,ns8,nutritionix,octopus-deploy,odnoklassniki,odnoklassniki-square,old-republic,opencart,openid,opera,optin-monster,orcid,osi,page4,pagelines,palfed,patreon,paypal,periscope,phabricator,phoenix-framework,phoenix-squadron,php,pied-piper,pied-piper-alt,pied-piper-hat,pied-piper-pp,pied-piper-square,pinterest,pinterest-p,pinterest-square,playstation,product-hunt,pushed,python,qq,quora,r-project,raspberry-pi,ravelry,react,reacteurope,readme,rebel,red-river,reddit,reddit-alien,reddit-square,redhat,renren,replyd,researchgate,resolving,rev,rocketchat,rockrms,rss-square,rust,safari,salesforce,sass,schlix,scribd,searchengin,sellcast,sellsy,servicestack,shirtsinbulk,shopify,shopware,skype,slack,slack-hash,slideshare,snapchat,snapchat-ghost,snapchat-square,soundcloud,sourcetree,speakap,speaker-deck,spotify,squarespace,stack-exchange,stack-overflow,stackpath,staylinked,steam,steam-square,steam-symbol,sticker-mule,strava,stripe,stripe-s,studiovinari,stumbleupon,stumbleupon-circle,superpowers,supple,suse,swift,symfony,teamspeak,telegram,telegram-plane,tencent-weibo,themeco,themeisle,think-peaks,tiktok,trade-federation,trello,tumblr,tumblr-square,twitch,twitter,twitter-square,typo3,uber,ubuntu,uikit,umbraco,uncharted,uniregistry,unity,unsplash,untappd,ups,ussunnah,vaadin,viacoin,viadeo,viadeo-square,viber,vimeo,vimeo-square,vimeo-v,vine,vk,vnv,vuejs,waze,weebly,weibo,weixin,whatsapp,whatsapp-square,whmcs,wikipedia-w,windows,wix,wizards-of-the-coast,wodu,wolf-pack-battalion,wordpress,wordpress-simple,wpbeginner,wpexplorer,wpforms,wpressr,xbox,xing,xing-square,y-combinator,yahoo,yammer,yandex,yandex-international,yarn,yelp,yoast,youtube,youtube-square,zhihu'
    },

    allIcons: [],
    filteredIcons: [],
    activeFilter: 'all',
    searchDelayTimer: null,

    init: function () {
        var me = this,
            data = [];

        // Parse solid icons
        me.statics().solidNames.split(',').forEach(function (name) {
            if (name) {
                data.push({ name: name, cssClass: 'fa fa-' + name, group: 'solid' });
            }
        });

        // Parse regular icons
        me.statics().regularNames.split(',').forEach(function (name) {
            if (name) {
                data.push({ name: name, cssClass: 'far fa-' + name, group: 'regular' });
            }
        });

        // Parse brand icons
        me.statics().brandsNames.split(',').forEach(function (name) {
            if (name) {
                data.push({ name: name, cssClass: 'fab fa-' + name, group: 'brands' });
            }
        });

        me.allIcons = data;
        me.filteredIcons = data;
    },

    // ── Render gallery on first render ──

    onGalleryRender: function () {
        this.renderGallery(this.allIcons);
    },

    // ── Build gallery HTML ──

    renderGallery: function (icons) {
        var me = this,
            gallery = me.lookup('iconGallery'),
            count = me.lookup('lblCount'),
            chipCount = me.lookup('lblChipCount'),
            html = [],
            i, icon, prefix, groupLabel;

        if (!gallery || !gallery.getEl()) {
            return;
        }

        me.filteredIcons = icons;

        if (icons.length === 0) {
            html.push('<div class="icons-empty">');
            html.push('<div class="icons-empty-icon"><i class="x-fa fa-search"></i></div>');
            html.push('<div class="icons-empty-text">Không tìm thấy icon phù hợp</div>');
            html.push('<div class="icons-empty-hint">Thử tìm từ khóa khác hoặc chọn nhóm icon khác</div>');
            html.push('</div>');
        } else {
            html.push('<div class="icons-grid">');
            for (i = 0; i < icons.length; i++) {
                icon = icons[i];
                prefix = icon.group === 'brands' ? 'fab' : (icon.group === 'regular' ? 'far' : 'fa');
                groupLabel = icon.group === 'solid' ? 'fas' : (icon.group === 'regular' ? 'far' : 'fab');

                html.push(
                    '<div class="icon-card" data-css="' + icon.cssClass + '" data-name="' + icon.name + '">' +
                        '<span class="icon-badge badge-' + icon.group + '">' + groupLabel + '</span>' +
                        '<div class="icon-preview">' +
                            '<i class="' + icon.cssClass + '"></i>' +
                        '</div>' +
                        '<div class="icon-name" title="' + icon.name + '">' + icon.name + '</div>' +
                        '<div class="icon-copy-hint">' +
                            '<i class="x-fa fa-copy"></i> Click copy' +
                        '</div>' +
                    '</div>'
                );
            }
            html.push('</div>');
        }

        gallery.setHtml(html.join(''));

        // Update counts
        if (count) {
            count.setHtml(
                '<span class="icons-count-badge">' +
                icons.length + ' / ' + me.allIcons.length + ' icons' +
                '</span>'
            );
        }
        if (chipCount) {
            chipCount.setHtml(icons.length + ' icon');
        }

        // Bind click events (delegate)
        me.unbindGalleryEvents();
        gallery.getEl().on('click', me.onGalleryClick, me);
    },

    unbindGalleryEvents: function () {
        var me = this,
            gallery = me.lookup('iconGallery');
        if (gallery && gallery.getEl()) {
            gallery.getEl().un('click', me.onGalleryClick, me);
        }
    },

    // ── Handle icon card click ──

    onGalleryClick: function (e) {
        var me = this,
            card = Ext.fly(e.target).up('.icon-card');

        if (card) {
            var cssClass = card.getAttribute('data-css'),
                name = card.getAttribute('data-name');

            me.doCopy(cssClass, card);

            // Track filter state for analytics if needed
            // console.log('Copied:', cssClass, 'from group:', me.activeFilter);
        }
    },

    // ── Copy to clipboard with animation ──

    doCopy: function (cssClass, cardEl) {
        var me = this;

        // Try modern clipboard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(cssClass).then(function () {
                me.showCopySuccess(cssClass, cardEl);
            }, function () {
                me.fallbackCopy(cssClass, cardEl);
            });
        } else {
            me.fallbackCopy(cssClass, cardEl);
        }
    },

    fallbackCopy: function (cssClass, cardEl) {
        var textArea = document.createElement('textarea');
        textArea.value = cssClass;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            this.showCopySuccess(cssClass, cardEl);
        } catch (err) {
            Ext.toast({
                html: 'Không thể copy: ' + cssClass,
                title: 'Lỗi',
                align: 't',
                ui: 'danger',
                closable: false
            });
        }

        document.body.removeChild(textArea);
    },

    showCopySuccess: function (cssClass, cardEl) {
        // Add copied class for animation
        if (cardEl) {
            cardEl.addCls('icon-card-copied');
            Ext.defer(function () {
                cardEl.removeCls('icon-card-copied');
            }, 1200);
        }

        Ext.toast({
            html: '<span style="font-family:monospace;">' + cssClass + '</span>',
            title: 'Đã copy vào clipboard',
            align: 't',
            ui: 'success',
            closable: false,
            duration: 2000
        });
    },

    // ── Search (real-time on keyup with debounce) ──

    onSearchKeyup: function () {
        var me = this;

        if (me.searchDelayTimer) {
            clearTimeout(me.searchDelayTimer);
        }

        me.searchDelayTimer = setTimeout(function () {
            me.applyFilters();
        }, 200);
    },

    // ── Filter chip click ──

    onChipClick: function (btn) {
        var me = this,
            chipValue = btn.chipValue,
            chips = me.lookup('filterChips'),
            allBtns = chips.items.items,
            i;

        me.activeFilter = chipValue;

        // Update active state on chips
        for (i = 0; i < allBtns.length; i++) {
            if (allBtns[i].chipValue === chipValue) {
                allBtns[i].addCls('icon-chip-active');
            } else {
                allBtns[i].removeCls('icon-chip-active');
            }
        }

        me.applyFilters();
    },

    // ── Apply all filters ──

    applyFilters: function () {
        var me = this,
            txtField = me.lookup('txtTuKhoa'),
            keyword = txtField ? (txtField.getValue() || '').toLowerCase().trim() : '',
            nhom = me.activeFilter || 'all',
            filtered;

        filtered = me.allIcons.filter(function (icon) {
            var matchGroup = (nhom === 'all' || icon.group === nhom);
            var matchKeyword = !keyword || icon.name.toLowerCase().indexOf(keyword) > -1;
            return matchGroup && matchKeyword;
        });

        me.renderGallery(filtered);
    },

    // ── Reset / Refresh ──

    onLamMoi: function () {
        var me = this,
            txtField = me.lookup('txtTuKhoa'),
            chips = me.lookup('filterChips'),
            allBtns = chips.items.items,
            i;

        // Reset search
        if (txtField) {
            txtField.setValue('');
        }

        // Reset filter to 'all'
        me.activeFilter = 'all';
        for (i = 0; i < allBtns.length; i++) {
            if (allBtns[i].chipValue === 'all') {
                allBtns[i].addCls('icon-chip-active');
            } else {
                allBtns[i].removeCls('icon-chip-active');
            }
        }

        // Re-render
        me.filteredIcons = me.allIcons;
        me.renderGallery(me.allIcons);

        Ext.toast({
            html: 'Đã làm mới danh sách icon.',
            title: 'Thông báo',
            align: 't',
            ui: 'info',
            closable: false
        });
    }
});