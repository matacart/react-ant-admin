import { message } from 'antd';
import { Request, Response } from 'express';
import { fill } from 'lodash';

// 模拟分类列表
export default {
    'POST  /api/ApiTemplate/file_list': (req: Request, res: Response) => {
        res.json({
            "code": 0,
            "msg": "ok",
            "data": [
                {
                    "id": null,
                    "fileName": "locales/el.json",
                    "isPrivate": null,
                    "checksum": "a8fd1447c4f82dd1d5f9032cea88d5b862ac58b744b6a9b3232aacebe229c6c0",
                    "fileContentChecksum": "b687a271efd91b421ebad01255611fec5077aee54f63ef108c35cb92b716c31a"
                },
                {
                    "id": null,
                    "fileName": "sections/main-password-header.html",
                    "isPrivate": null,
                    "checksum": "36e15a92eb4fea8ef6eb711d6c4fc3f58916bb413fa3f35bab73db346b137a54",
                    "fileContentChecksum": "b5e74325ce2df09011558aa1ab40fe4d764a64302e447203cbb67338266b4b0b"
                },
                {
                    "id": null,
                    "fileName": "sections/icon-list.html",
                    "isPrivate": null,
                    "checksum": "1f96a28bc5936dc466c409aa0e2dc8b791fdeb3bce7f35bef36706453960ed52",
                    "fileContentChecksum": "fde45d8abe5cbfdb9c583f94539bdab13ce0c2a53a5cf8576ebd96550c9d210e"
                },
                {
                    "id": null,
                    "fileName": "layout/password.html",
                    "isPrivate": null,
                    "checksum": "23794ba2a1305c45fc5fd8ecaa1bb7455455b7bf20a5ae6863e9ce7c07060edf",
                    "fileContentChecksum": "dae987013ecb938ea65321840802fb526cda7fcc5c44aa6467efc9eca20b0319"
                },
                {
                    "id": null,
                    "fileName": "sections/contact-form.html",
                    "isPrivate": null,
                    "checksum": "959b87e1801763565e156748c6035281f421d0d3140a09d15fb24e6053aeb011",
                    "fileContentChecksum": "66b20683d44da1bbbff43afb1b26fd296a4741701fc3f6684a81ed615776961e"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-sell-checkmark.html",
                    "isPrivate": null,
                    "checksum": "6470fcb797c9c7f0e714829f86701504b64524ae2e27894f816ad1b02a6f6019",
                    "fileContentChecksum": "2ac25bc290b1a18f5aa394f2594cdfc32116974cad24dd801b6ec8e7ea291fd6"
                },
                {
                    "id": null,
                    "fileName": "snippets/footer-newsletter.html",
                    "isPrivate": null,
                    "checksum": "a50df0c2d7b87afb3947eaf04db8e1c7260ffd8a35aff970b28911008dca049d",
                    "fileContentChecksum": "3530b22268951b70f52649ce086d93a7600917a8368aad6c8d0cca366640cc5e"
                },
                {
                    "id": null,
                    "fileName": "locales/nb.json",
                    "isPrivate": null,
                    "checksum": "bf6acca73fd1a42da09e551d474e0711b55c922fb1d5efdf03fc0680cde90f38",
                    "fileContentChecksum": "c71f0902f01ecb64cafbbdd73fe3c2308711d1e19d675a6e6fea6caa405f9279"
                },
                {
                    "id": null,
                    "fileName": "snippets/share-card-content.html",
                    "isPrivate": null,
                    "checksum": "22dab795950e3e6ce29fa88726017023ae8c5765d8258a4340190fd73b7712af",
                    "fileContentChecksum": "2a8fd4a9d8ca648942b776fbd287bf74a77f579657d09915bad0c74ca2266007"
                },
                {
                    "id": null,
                    "fileName": "sections/main-page.html",
                    "isPrivate": null,
                    "checksum": "a8c8ba8fe194b9e0d9e1d5588a6e0db9cfa973692a5026991a27e1781f0975d2",
                    "fileContentChecksum": "abd206f9966ec08d469914d436388c78783dbe770eed2104811819e8ed3008aa"
                },
                {
                    "id": null,
                    "fileName": "snippets/product-media-gallery.html",
                    "isPrivate": null,
                    "checksum": "49823f1c59132c4b063006d29bf0b3b43ca9625a589245c1aa20e420958f6a81",
                    "fileContentChecksum": "31153291230616109abd60ffbc26678ecc9e91aa330f79eec696f91daae4eed7"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-rich-text-decoration.html",
                    "isPrivate": null,
                    "checksum": "1848cb503bd95a12eaf09689ceb0713cca36a06fd116e5b09c2091d1a3996b80",
                    "fileContentChecksum": "c75e18489c51bd32c656e9da2ba82275f62ea0a468ae223cc1be66ab9506bab7"
                },
                {
                    "id": null,
                    "fileName": "assets/product-float-buy-buttons.js",
                    "isPrivate": null,
                    "checksum": "ed4c8b3942362005234d722b60de7082d1ace30c3ca2b2fa3ade361b66542668",
                    "fileContentChecksum": "9645e8adea9a9afb42cfc6a3dcc6bbf4c3fe53a4347ef0e38cc0f84dea9bdb95"
                },
                {
                    "id": null,
                    "fileName": "templates/gift_card.html",
                    "isPrivate": null,
                    "checksum": "7f82356207395db87b6af9952027eff9578b4afebcc9ea90d8cd615b99d0f8c6",
                    "fileContentChecksum": "b477310650dbed96523291180fd176de4aa39ba25d771d1ad398574b9acb1308"
                },
                {
                    "id": null,
                    "fileName": "assets/component-tool-tip.js",
                    "isPrivate": null,
                    "checksum": "161a039135a1deffb95aede6fe9a06088913a26dc77698a2fad75e0e219470de",
                    "fileContentChecksum": "6bb627e3399082899129a738a482b417cd304de8714d864bc8df13e4f97b996d"
                },
                {
                    "id": null,
                    "fileName": "assets/component-slider.js",
                    "isPrivate": null,
                    "checksum": "50607d9d38d9ad570af0cc843bb54b349664f8e2d6c65e2baf49c9000da3291a",
                    "fileContentChecksum": "1044dfedc81239128028af74a1f8a4b11b0f076af54b30ec83dae6a34d9e9fcc"
                },
                {
                    "id": null,
                    "fileName": "locales/fr.json",
                    "isPrivate": null,
                    "checksum": "0cf7d29cf9a7470a18e91644a24c83993058a24e5147845143ca113073fc4401",
                    "fileContentChecksum": "1c5ca1cc6ecdc24ba02d963c3cf70a76426dd528c346a6e870d3b52e7b41b60c"
                },
                {
                    "id": null,
                    "fileName": "assets/section-rich-text.css",
                    "isPrivate": null,
                    "checksum": "3330f21be384392dff22d5d3ffbf66c44b31a236a50336b4988b8e23b698121b",
                    "fileContentChecksum": "aaa93bc8aa66ca64146d8601072239db555d5a8658dde5c00d32885477918884"
                },
                {
                    "id": null,
                    "fileName": "sections/featured-product.html",
                    "isPrivate": null,
                    "checksum": "6b1e3236052f04077536f0199f025c323af3166386860cd9d5c17ca13fb52ca4",
                    "fileContentChecksum": "45c6e0a685976056f4f389ac973594cfd82868137c785a706abe2706a97d2d2f"
                },
                {
                    "id": null,
                    "fileName": "templates/customers/company.json",
                    "isPrivate": null,
                    "checksum": "cca7f24b19eb3a98913cffa28eba16469c67cdee7f272d44f54ada5dd6c61e05",
                    "fileContentChecksum": "bc9f37dd10c0adadb243e1b4113a7ccc45844a28bcba705df10ed63a8c0e534e"
                },
                {
                    "id": null,
                    "fileName": "snippets/input-phone.html",
                    "isPrivate": null,
                    "checksum": "c0813a20d6fd5ea82c74c174fbbec83a67110e66e235fc198b4aaffa3bb69309",
                    "fileContentChecksum": "7a9f7d957e8df81e879d99fab5593f16d3e16f24b60c86357f32f12a9b56a1df"
                },
                {
                    "id": null,
                    "fileName": "sections/collection-list.html",
                    "isPrivate": null,
                    "checksum": "be327da499d4949d682967d339a726ff213e1fa3b712807d5d30e6eb64f828ac",
                    "fileContentChecksum": "16614c0a33e92b7a97ac3b368faedc19d52dac29a869b2e2a4c1a2c928c7730c"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-official-tumblr.html",
                    "isPrivate": null,
                    "checksum": "e1e1f59adaeb3c03b49966f9bc488f3e2bb4654f13d9c9c9ad1f8d6615aac31f",
                    "fileContentChecksum": "99b4d2cc534aefea2597e99d99c70ba53e179aaeb05ca6be9047b4c91bf6e272"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-official-kakao.html",
                    "isPrivate": null,
                    "checksum": "4d55aeb5d678e7dfe01733596f6784dbc08a731bffacb353e47c30f0d0ec376d",
                    "fileContentChecksum": "6b36990034c85d08dbd840063179f10eec23dd4c2ba35fb0157ed43ecff6ce4e"
                },
                {
                    "id": null,
                    "fileName": "assets/section-product-recently-viewed.css",
                    "isPrivate": null,
                    "checksum": "ae097813a2b2d4d37268fcb6044aecd5349ff13f0cf6bf5aeb1a1bed1e3757a0",
                    "fileContentChecksum": "6eb78d46bf1df3294f3bba5474e7953ea05250c26153a29227c70b4c9c47c38e"
                },
                {
                    "id": null,
                    "fileName": "snippets/breadcrumb.html",
                    "isPrivate": null,
                    "checksum": "d16ccce14a6f47320b5dfefe297073c14bc9ae89b18c1f5e4f9c16d9966a7caf",
                    "fileContentChecksum": "0c2e64cadb14e5b0f2787c58bbb7551368e3d01aea63d18c3438229bbc381dd1"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-plus.html",
                    "isPrivate": null,
                    "checksum": "83b9cfdb59927918392cc3f3b4c6f424e96322cdc16ed80c6ce0f36ce0d0d30c",
                    "fileContentChecksum": "59bad1b7d0b8dab5b09ee87e6783132ee98d29386b5b7eead196a1d0f71d5743"
                },
                {
                    "id": null,
                    "fileName": "sections/main-product.html",
                    "isPrivate": null,
                    "checksum": "d8c513ab23443a10b2f30c06a63dbc768c3cb7de9b6ae46e1f0c87dec1cd45ce",
                    "fileContentChecksum": "454d951aca6178c77ee7fe310c6bbaa20726e06720defdb44aa0e9b52abcf957"
                },
                {
                    "id": null,
                    "fileName": "assets/picture-floating-icon.png",
                    "isPrivate": null,
                    "checksum": "b6befa3155133c64f60cfd8b6a30cda717184664ac7cdee5a2c17f6747450c22",
                    "fileContentChecksum": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                },
                {
                    "id": null,
                    "fileName": "snippets/collection-card.html",
                    "isPrivate": null,
                    "checksum": "cf2378e11fb4b13792ee994a1bc22b7874e89cc669f788d54a489644362c8abc",
                    "fileContentChecksum": "f875f47edc5bdbf67fd20043dcbb63bcf2e0f53f387f7b28e2ec17e355e909dd"
                },
                {
                    "id": null,
                    "fileName": "assets/section-product-recommendations.css",
                    "isPrivate": null,
                    "checksum": "b305d20338f0201413894b4cbd2eb4499ca4d6022ef565b73f16e4852af27236",
                    "fileContentChecksum": "167915f45e94251bf14e0b3922a3f1a69dae4b5c4e60ecd08b698b59bf8153e3"
                },
                {
                    "id": null,
                    "fileName": "snippets/account-address.html",
                    "isPrivate": null,
                    "checksum": "7aa9ed85298ee000e285e1a04879d6924527394e1338a94af9569b3eb5511318",
                    "fileContentChecksum": "3ea19a7e94568b4e0fa4c3cb46275070fafba88f9c502db7f19f9be054eb2a08"
                },
                {
                    "id": null,
                    "fileName": "assets/lib-splide.min.css",
                    "isPrivate": null,
                    "checksum": "6de0f4fd7c44a023e2c14e8c6de4246507d44ccee643e4e5242b7a9cc465a9ef",
                    "fileContentChecksum": "0f0e70fb4b08864a55e3b6b462be828395b8649cd5d23ba2a10dbfb2d288255c"
                },
                {
                    "id": null,
                    "fileName": "assets/section-collection-list-new.css",
                    "isPrivate": null,
                    "checksum": "3b10e560b3be7ca4e9502fd4a338bd412658e2e2decfd733136f2a96458b6dc4",
                    "fileContentChecksum": "1d14b2bba6c3047026cde1fd4eacd3ddcbdb9d2d01b756a0e1e8ed01c77fe8af"
                },
                {
                    "id": null,
                    "fileName": "sections/main-company.html",
                    "isPrivate": null,
                    "checksum": "035206ed540327c1961ffd39baf3007852a07f3fea1f790d8da0c433db1e7f70",
                    "fileContentChecksum": "389f142cdc8112876ae71c185d905b53203265d84e04c06c9b4ddc201b9d5803"
                },
                {
                    "id": null,
                    "fileName": "assets/section-slideshow.css",
                    "isPrivate": null,
                    "checksum": "11f9cb0e22123c9d4e4a34778040b17863ea567c1f2bc60be836b296b60fc22d",
                    "fileContentChecksum": "44a6396b4d6e07a48fc09e01f376448bb292e5cd98a74612fe4f23af64deffb4"
                },
                {
                    "id": null,
                    "fileName": "assets/component-color-swatch.js",
                    "isPrivate": null,
                    "checksum": "096a7c5f8ccd2c9ff6853060760efbf9ea3d5ec652a8c21c216569d9d321fda3",
                    "fileContentChecksum": "aeb625c8d741f8d5f37b6483ccfc32d4b6da23a7224257ce580997cd0e3a8c76"
                },
                {
                    "id": null,
                    "fileName": "snippets/product-photo-swipe-source-media.html",
                    "isPrivate": null,
                    "checksum": "1bab3d9b4fd87a2940c6b780b47b15c42f8925541c9f148ba36b3221b35cca51",
                    "fileContentChecksum": "1e8364799750849776c0ae2340b2aa0d2ad5d9dc515cc9b6e9efbe16f1d24cb0"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-user.html",
                    "isPrivate": null,
                    "checksum": "c491bc7a085f6942908572354840437ac6651a2973dbff747170bf032eb846d9",
                    "fileContentChecksum": "f91420164c58751814ce072d287fd1322268ae1f45b806d4dbcbfa16b1e9174c"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-warning.html",
                    "isPrivate": null,
                    "checksum": "8880b141f9068d998decbc7bb273b73c0904cbb22c50ee6c7c45661f66767bde",
                    "fileContentChecksum": "e66a82b829c8ac0d8a31776457f14f708ee05f2570cafa92f3afc89f5c4778c0"
                },
                {
                    "id": null,
                    "fileName": "locales/ja.json",
                    "isPrivate": null,
                    "checksum": "6e51b9069610298e506fec7cf81de2fc57d40e454837f6d63d28ce03e18074fc",
                    "fileContentChecksum": "971d3d85ef895d6c4bc742b7d284759dbc9dd3aabe02dc8a86199e093c94196e"
                },
                {
                    "id": null,
                    "fileName": "assets/component-contact-form.css",
                    "isPrivate": null,
                    "checksum": "a5d8b53c4b9dfaaea2861bc9a3f6585b0fee2d3254bc5fb19ce4510953ad4933",
                    "fileContentChecksum": "1cc7d01a97036e844026c621b3d138e47d3c1cbbf8f077a8afdc8c1d94003c4f"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-sell-leaf.html",
                    "isPrivate": null,
                    "checksum": "8398a0244ad8f2727186d4164bb7bcd30c035fa2be50d03b24031102386c3182",
                    "fileContentChecksum": "0e67295d522a72a2059a9f500343a8ee022cd6729f99f1a91361e71b645e21b8"
                },
                {
                    "id": null,
                    "fileName": "snippets/blog-card.html",
                    "isPrivate": null,
                    "checksum": "7e3d01a8a373f88377996a0a10e83df5e46a961b88f1ce1a32c3666652fe19d4",
                    "fileContentChecksum": "9305752a3fb2bf3b09c0a3677d7f52b549effebb6c5828ca15ebb348061567e5"
                },
                {
                    "id": null,
                    "fileName": "templates/customers/forgot_password.json",
                    "isPrivate": null,
                    "checksum": "dc0c4be5381c47d6a5ba741ad916df18d66f987343afaf652a2bc64417298134",
                    "fileContentChecksum": "416b865040ec4c30f026624bc348632fa1c197e86dd48ea34a9d8195379f2159"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-error.html",
                    "isPrivate": null,
                    "checksum": "9a506381d560feccb8e65f555fa8843f15a1659723110644d3e2a770eb240128",
                    "fileContentChecksum": "68b1edc13c078f78036ab5511e017ec739b2afd0bd033c8a0eced5d253db4c16"
                },
                {
                    "id": null,
                    "fileName": "snippets/account-account.html",
                    "isPrivate": null,
                    "checksum": "b78e3005a5b1699df6fd8cbefb8e637b96561e1b0b0b1a5be3373e0ce95e1967",
                    "fileContentChecksum": "8b44dffd3f47c5862bad0913a47d01c628dc2271370ca21117d14c87a16cd227"
                },
                {
                    "id": null,
                    "fileName": "locales/ar.json",
                    "isPrivate": null,
                    "checksum": "f006c9efd3d713d8d5f6a29b842c636cf5637ec461a37e12a422dcd8ed8b7002",
                    "fileContentChecksum": "42e4c7cf51dd352595315e7993bb5159b2113d401b11cb0bbae3992d07c7e85c"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-toolbar-social-youtube.html",
                    "isPrivate": null,
                    "checksum": "819e24f0f116ed199b5578ea14aee0c7134baab3760237274a1afbfcf3eacfe4",
                    "fileContentChecksum": "7719577c8a75da15f2a5727237531eea6dd91b7d7f6ead90713cb2b2ea4e14c5"
                },
                {
                    "id": null,
                    "fileName": "assets/component-accordion.css",
                    "isPrivate": null,
                    "checksum": "ece1c4cc24d1a907909b100d469cb3f80eac7cf894537d476652cd352cc25e9d",
                    "fileContentChecksum": "8aedf7a3c02808cac3d1b09463d2a1bd3a12694d7db9f588da4a8fb9fdce3164"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-page.css",
                    "isPrivate": null,
                    "checksum": "2560ac35b4f2e36556ef229aeb7a0991487f2c134869aa6076b649a0cefc50b9",
                    "fileContentChecksum": "9c27ae7e0fcf640a759d99622f691ada96fd41db9f0b2a1ff6e0fa3758c761a3"
                },
                {
                    "id": null,
                    "fileName": "templates/article.alternate33.json",
                    "isPrivate": true,
                    "checksum": "62de6eff17c1630c74ba3913c8c7bf3cd68cf361a4561f34b51c5441d50a5921",
                    "fileContentChecksum": "42e8bedfe068e5083d9aa153abfedc09e5a8ce26dfb36d7b0310607fc0fcd580"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-toolbar-social-linkedin.html",
                    "isPrivate": null,
                    "checksum": "e9cde7ff757f8288758a0c355fec5a65eaacc2755465daeb2c68700ce4dcbe88",
                    "fileContentChecksum": "2ef7ebf0116548fd1133e1245731eadd966e2e57aa3dc6fedc0956b2bd003b09"
                },
                {
                    "id": null,
                    "fileName": "snippets/footer-conact-block.html",
                    "isPrivate": null,
                    "checksum": "f7e7d10140a77608367b529c5071cbd9e74ded39714286e395a0622877231b95",
                    "fileContentChecksum": "63fb565332c3a69e39417c8356972363baf7a58f22a7ca7261fadd7468d2b266"
                },
                {
                    "id": null,
                    "fileName": "locales/es.json",
                    "isPrivate": null,
                    "checksum": "cfd026edfd4749ad4acbd5febef14b4ad5df7358c1fac6ad1c1846b996fb0c8c",
                    "fileContentChecksum": "1287f1fbb02b99732a2fc1110c5705584999cbfe1768ce9b79080d60856a8f11"
                },
                {
                    "id": null,
                    "fileName": "sections/predictive-search.html",
                    "isPrivate": null,
                    "checksum": "25b580523ffbab3666f5c7f53be4b45a33b635c251190afb4189cd8b8bcb2aa7",
                    "fileContentChecksum": "a94c09777f185a2b8c13cd1dd8045d1359c7090ba48cf8c4c35d5b7c08861ec3"
                },
                {
                    "id": null,
                    "fileName": "assets/lib-photoswipe-lightbox.umd.min.js",
                    "isPrivate": null,
                    "checksum": "00c52cb9dfa31a91aabff7a10ad342f0902763cc4be2df3ae9a27a0fba99fbff",
                    "fileContentChecksum": "3826e3b52e7021091ba6e5c183c3263435c9c12608dcacc1ff87fb51b1393759"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-password.js",
                    "isPrivate": null,
                    "checksum": "b91a211786590a94abdcc04cd13149614e92f9773126736a21e1cd507bb39fb0",
                    "fileContentChecksum": "dd8f905ab592b6d96835d62f502dbad54969427726574df067045a9db7985071"
                },
                {
                    "id": null,
                    "fileName": "assets/component-slide-pagination.css",
                    "isPrivate": null,
                    "checksum": "ca5f141faf35e1462a11edc9584a0ca5d37fa42d370abd12aa189ae82bdeabd3",
                    "fileContentChecksum": "d387d1fb10139efad059ff9f7dde893e3d85680761a36f80eb7a0a24b4bb1fd6"
                },
                {
                    "id": null,
                    "fileName": "templates/cart.json",
                    "isPrivate": null,
                    "checksum": "f81201b3f0fa368aa235fe1d1b98f4f2cae0df07035edc8e037c1c2f9f49dfc6",
                    "fileContentChecksum": "3aeec0e88f03a2ea546c8a577c2f062e19589f45d2d63ec0f6bcdd2548d4607a"
                },
                {
                    "id": null,
                    "fileName": "assets/section-collection-product-list.css",
                    "isPrivate": null,
                    "checksum": "9f676e7766f084a9b520cfcff363661f3c567c99f0077f07aff6f67266457e6f",
                    "fileContentChecksum": "b24bb15478184093690d7e50c1a5418aca666f65c2a0124146d6f2ef02f3063f"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-toolbar-social-twitter.html",
                    "isPrivate": null,
                    "checksum": "19df447ba9171a524490090697fc0547ee0a1ce084681299be69d30efa5b066c",
                    "fileContentChecksum": "4109c7e11a853d8416fb29d022981450af3c421e81eebe135a36d816a1cd5927"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-account-apple.html",
                    "isPrivate": null,
                    "checksum": "5b7ea8dee6a32be81db771e9695a7042ca221eb24e63dbbed579dfd4817923c6",
                    "fileContentChecksum": "33cdfae2b2d71bf85176befe3803046655087cd1ceb0777952138ca7c8b0368a"
                },
                {
                    "id": null,
                    "fileName": "sections/cart-drawer.html",
                    "isPrivate": null,
                    "checksum": "f38cd86ee7bf26bb4009e40dbbf94f4766961a11ebc06e701258235ad3563b3f",
                    "fileContentChecksum": "82dce86015fc91e1a4ffcac447a14d3d41439093b5b06db13b989101a7749164"
                },
                {
                    "id": null,
                    "fileName": "assets/section-header-modal.js",
                    "isPrivate": null,
                    "checksum": "b6aff425233d9522d810b4b078e694c80a9d95eee5d34643d663d346eeb3e3fa",
                    "fileContentChecksum": "a846042d8ec5cab55f93fd40be9a1ba7eca8f34c46200ba0b9924c6c0f94c8dd"
                },
                {
                    "id": null,
                    "fileName": "templates/collections_all.json",
                    "isPrivate": null,
                    "checksum": "672408a262813de16054d46bb1ba74cde9b2ae2d921bfba35d79fe534ccbc47c",
                    "fileContentChecksum": "4d0c83598992b1c05ae09589d0aadfc1d7279a2b26e5daeaef194fccdccfff69"
                },
                {
                    "id": null,
                    "fileName": "snippets/cart-item.html",
                    "isPrivate": null,
                    "checksum": "1b60ff7a97ccc94dc4b96422e96abf0cb701801ed048ae46bfa778cd6ae6d502",
                    "fileContentChecksum": "e69ddc4c6766707997ee9790f98bf5b6b20794589f84364ba372c24200e089b8"
                },
                {
                    "id": null,
                    "fileName": "snippets/cart-notification.html",
                    "isPrivate": null,
                    "checksum": "8491a8a25fa6b169d5d2a20282e4beb4d17807c84e27c80339f79a78dcb852f1",
                    "fileContentChecksum": "2683b7d5beb7d55065ace8a6837b2c7731f1384a613e12e03c6f6d530ceb1f2b"
                },
                {
                    "id": null,
                    "fileName": "templates/article.json",
                    "isPrivate": null,
                    "checksum": "62de6eff17c1630c74ba3913c8c7bf3cd68cf361a4561f34b51c5441d50a5921",
                    "fileContentChecksum": "42e8bedfe068e5083d9aa153abfedc09e5a8ce26dfb36d7b0310607fc0fcd580"
                },
                {
                    "id": null,
                    "fileName": "templates/customers/register.json",
                    "isPrivate": null,
                    "checksum": "491510abd605eb0c0688e815b51ae54424df732b8f0204dcbdfa776459ae2e0b",
                    "fileContentChecksum": "b6940ecebbc41f7b39411f180c2b4de8c8a44c97fc76f5b3212c76bacfeadd7e"
                },
                {
                    "id": null,
                    "fileName": "sections/dividing-line.html",
                    "isPrivate": null,
                    "checksum": "4cf3dc48c9039d5b8853dd0b18787527fec1e06e9fb1f0a72ef86fd8c22774d5",
                    "fileContentChecksum": "3c4cfe3967bf8b8f6a0153f6b554f0b96d7578bad55714d6ca1e223c1b6a3c01"
                },
                {
                    "id": null,
                    "fileName": "locales/hr.json",
                    "isPrivate": null,
                    "checksum": "32f074398ad2a3797a202219b4c16427a478e02a0ff2ad5dc4f17151aae3668b",
                    "fileContentChecksum": "aea73a53cffc9fecd6699d921cc8305d8088a0dfbac1a3ba39b81907c436f66f"
                },
                {
                    "id": null,
                    "fileName": "snippets/section-padding-creator.html",
                    "isPrivate": null,
                    "checksum": "11c77450363c37861a37da78f18183e129062f639a545d00b03d598a515d2e6d",
                    "fileContentChecksum": "fc5fc2167f841f1f5057ce382ecaf51b0f1bafcda740621fe6d4e10afce52a71"
                },
                {
                    "id": null,
                    "fileName": "assets/section-multilevel-filter.css",
                    "isPrivate": null,
                    "checksum": "4893530bcc3bf7e746f66c9284569f3c16e780b48a952c8ab50c7fd10b7f6850",
                    "fileContentChecksum": "c2ec862e45d067417e5373300800628365ff87ceeefa7602034ee0b796577ffe"
                },
                {
                    "id": null,
                    "fileName": "locales/ro.json",
                    "isPrivate": null,
                    "checksum": "a2b1bf3487688b55e634b920239a5173fcd0224191898e706e9631da66b8c6a9",
                    "fileContentChecksum": "0eead1b08782c80b920b61162f67f2af531f5b1a63ce7136fdfa776e4d74bfa2"
                },
                {
                    "id": null,
                    "fileName": "locales/th.json",
                    "isPrivate": null,
                    "checksum": "980081eed010479629979063632e6df6f6cc431ce68795447cdd6218191f6089",
                    "fileContentChecksum": "0b468f03cb56ff46fc37ac6dca4c820f1dcb766f51d9f38b55b9a66ea4fbbf5a"
                },
                {
                    "id": null,
                    "fileName": "snippets/user-center-navbar-footer.html",
                    "isPrivate": null,
                    "checksum": "83db7dde5b756990b38ec5dd72a92c1dc698ac368ed342cee7899acf40363a18",
                    "fileContentChecksum": "6c7a95688ed4dc8fa3e0be4a3bb4b6038edde4f445f20785619700570f2af842"
                },
                {
                    "id": null,
                    "fileName": "snippets/image.html",
                    "isPrivate": null,
                    "checksum": "1462221bc43a7679f7db0b239e6d7dfcd705e111f55c30871abc4c64014dac52",
                    "fileContentChecksum": "5072c4ece4740458c1a03abd084352f68a903aab284dd0f4053f67e810ff2992"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-order-list.css",
                    "isPrivate": null,
                    "checksum": "6f5dd2a7dfed2cd9bd7d35701acc884785e9987a9d38b748fe988677b03d6cd9",
                    "fileContentChecksum": "563da1258b72c599d515049319b3ef0926c279d1583d4c0f8f6bf008a5f710b3"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-discount-tag.html",
                    "isPrivate": null,
                    "checksum": "b7aac6f24fd560461a242ad12efc16597349b4a96c33ccf1b4526938d07d8e09",
                    "fileContentChecksum": "a5319e36c1575060e59fc72e2f54a7319ac3ef29411aefc53f43bac42e5cd5a9"
                },
                {
                    "id": null,
                    "fileName": "snippets/cart-fixed-checkout.html",
                    "isPrivate": null,
                    "checksum": "d3ec6d7529ec1c6b7897a4c208ca6e3b2ea394746d71aa271d562fe2f11c3d32",
                    "fileContentChecksum": "fc63146924ba0714d747dd3f1d1bd7a6432b6a195549d3a0e527f32d0651920d"
                },
                {
                    "id": null,
                    "fileName": "assets/section-header-header-layout.js",
                    "isPrivate": null,
                    "checksum": "a720ae923e441cb58560582f35326ed12355491a14da5349afb907ff86ce16f4",
                    "fileContentChecksum": "6bb49b03bd19407871cfe2bb6d4f3685fab69afd4e13292087052eda937af976"
                },
                {
                    "id": null,
                    "fileName": "sections/main-account.html",
                    "isPrivate": null,
                    "checksum": "824a9f738d4b3d4f6142dfd47ecd00f4fb9c12ef37f27eb366c8acdc8ca3e056",
                    "fileContentChecksum": "4d7b829f7121fc4414b715c9eefdfb364bd4bc7d52ab9bc07867ba2a442853eb"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-search.html",
                    "isPrivate": null,
                    "checksum": "04a854977f8351e7fe13efff90a6376ad0070950cb6db2db68d330b5abb4d4a7",
                    "fileContentChecksum": "68da1e409134c4c98a18b71b802e932d1089b4f8537912c50a1f454eb9a31911"
                },
                {
                    "id": null,
                    "fileName": "snippets/collection-pref-card.html",
                    "isPrivate": null,
                    "checksum": "439fcef59420d9141cef79dd27cdcbb12835607f9663298d8e411c93390e9e1d",
                    "fileContentChecksum": "5816c3221020ec1f21280b399b1863810bfcae077fac0fe2e4082bd92d426003"
                },
                {
                    "id": null,
                    "fileName": "snippets/account-personal.html",
                    "isPrivate": null,
                    "checksum": "b51acf5f565d19797c2f033c2e5e4eea88b7c450596d5ac4f5b20cd0b2835be5",
                    "fileContentChecksum": "209be2225734131a9f28f879948ebec5dc7ba81dca89e2a1661fc2a87c56eaf9"
                },
                {
                    "id": null,
                    "fileName": "assets/section-header.css",
                    "isPrivate": null,
                    "checksum": "8c62ebe7d9dd05e8235e50e32c3301a043277e02a228d6aab3eae4b4a0de7a2a",
                    "fileContentChecksum": "fe145cef50547a8c99596990ce1766a671fd9d201d0ee48460b0c21811344144"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-gift.html",
                    "isPrivate": null,
                    "checksum": "f518fdd64a479f82841803c3b6a0b9a593fc92e983b0addef5d75318ef7a9501",
                    "fileContentChecksum": "771f300ae183437145756f830943dc4f03f08fea1f3d4c7740410dee951f56d8"
                },
                {
                    "id": null,
                    "fileName": "assets/section-cart-drawer.css",
                    "isPrivate": null,
                    "checksum": "22d922275f005a4f8659ddd82d1c25a83ac2521ab01cb837fb8350909150b1e8",
                    "fileContentChecksum": "caa2941b2c7775bd77bdd6478b1a3768bbc7847883cb67ccf9e4f9476f00f79b"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-collection-tag.html",
                    "isPrivate": null,
                    "checksum": "45b160aed0f49a1a5b6733f4c767034a530b9528d8c67e9ef1dc17e871293a27",
                    "fileContentChecksum": "415e04786ef7db9d5698389d545f3f8218523bd0e7fd1d9c30fbc5d43f2416bb"
                },
                {
                    "id": null,
                    "fileName": "sections/collection-list-new.html",
                    "isPrivate": null,
                    "checksum": "e82300bb5f665836944b7e7c45105669189d5a9cab0cacaadb9300f36f042566",
                    "fileContentChecksum": "fbab3acdfcae86c03f634757e7fd52a170e9b7eadface9ac82e460c616efdfa0"
                },
                {
                    "id": null,
                    "fileName": "locales/et.json",
                    "isPrivate": null,
                    "checksum": "d64d38b7d1e21cb390197f11d94f737e198b845bdd02450da89daf467f6ef3e0",
                    "fileContentChecksum": "66f9608b9e5d748f7a12cc99889b1f926979e5973f3dd40c2f99bef0ffe83f26"
                },
                {
                    "id": null,
                    "fileName": "assets/section-customer-nav-bar.css",
                    "isPrivate": null,
                    "checksum": "8d0d4730450f529869330814940838a5ddd9145a8ead89ab8cdb5f8a554c4844",
                    "fileContentChecksum": "6e0fd484bb0a02ea543d973a3ffa3f6e044be4821e89fc208895a9dfd64357e8"
                },
                {
                    "id": null,
                    "fileName": "assets/component-color-swatch-radios.js",
                    "isPrivate": null,
                    "checksum": "d095941efea3a9bfa969b1d047df440e0ebc0cf8347f4d3448176ae5f09e3699",
                    "fileContentChecksum": "56ac4788b1c10cfc6ff46585c31f69dd63f5751bb25da816dc943ee702216c70"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-social-snapchat.html",
                    "isPrivate": null,
                    "checksum": "bf94f43ebfd90cdb117caa5db53b087c7b3bfb050cd76cefd5e473e71e94c992",
                    "fileContentChecksum": "25f72a2a9fdb1ba11bdced6f2125107ac24fa19860c71948ad66b3bf6ee3be5d"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-logo-list-earth.html",
                    "isPrivate": null,
                    "checksum": "3390416c6c97fc26422af99277ec83ea6a7cbf3e81ddbe89efa18b95f10f0bab",
                    "fileContentChecksum": "2db7468181ac55ff7503249a257e014102d7d088849a7c3d3a362a7becbade62"
                },
                {
                    "id": null,
                    "fileName": "locales/ru.json",
                    "isPrivate": null,
                    "checksum": "3f9b60f91977a5119d98c8b119ca262bcfa0ff6f7dd75e0e12eeee0c9f0ceb87",
                    "fileContentChecksum": "9861655b198d29e5ecd5719e611cdf292addd48fe5e6ece06087eb2e8724c646"
                },
                {
                    "id": null,
                    "fileName": "sections/picture-promotion.html",
                    "isPrivate": null,
                    "checksum": "6712648123aa465c54ed0637801b1dfb40a7495d92e6baee07d1311b45300691",
                    "fileContentChecksum": "987fc64868d95162d8c4ac0eba9bafe232fa0603410d2d1874208a47d0aaf6a5"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-toolbar-social-whatsapp.html",
                    "isPrivate": null,
                    "checksum": "e3dfd541013962fa22d80e4c3597263bc2c00cc92752a06929c8eafd5a645c4e",
                    "fileContentChecksum": "cc1e9ab77034b0b02b8224fb19f7c83b7ddd744686dfffc97f897646808937ff"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-official-youtube.html",
                    "isPrivate": null,
                    "checksum": "b30cbc89e36e0ddfa622f641b927f26fea90173b9503a114a154773f01ba44ef",
                    "fileContentChecksum": "c0ccdf38e0a81a5fa319c0d6b8e963bb21225d202cc6f25729435885efec208c"
                },
                {
                    "id": null,
                    "fileName": "locales/th.schema.json",
                    "isPrivate": null,
                    "checksum": "ddd2fa39888c49bdd5dcb505fb987d5dd84c9c042d057296698685ea7453ab61",
                    "fileContentChecksum": "9d4068d494771878c56a006481e02103b42acbb5d3f509cef2a76146d2d3c523"
                },
                {
                    "id": null,
                    "fileName": "sections/featured-recommend-products.html",
                    "isPrivate": null,
                    "checksum": "d32b1f8d6bc1f6cfdcd435ac879a0d012b59526a132f9ab88431f9779a1d8f42",
                    "fileContentChecksum": "00b4738d0259fc9081097d3d2a101955ad5d4189592c0ae136d59b7be1c67554"
                },
                {
                    "id": null,
                    "fileName": "sections/main-article.html",
                    "isPrivate": null,
                    "checksum": "8fea7cad012c34ba65d82fbf3acafe49666dd85d39c2b897b0c82cb10b22f81d",
                    "fileContentChecksum": "261a2b3c73d939abb1943ff00ecf590394ba60404f37d01897a6f218836ed76d"
                },
                {
                    "id": null,
                    "fileName": "sections/custom-page.html",
                    "isPrivate": null,
                    "checksum": "203e6b3708caf1cb23f14dab241d2c4b98a75f3173bf1207058709cc72a636e7",
                    "fileContentChecksum": "c109bfc780cab372477c6bcccab9f884b2337a5c75fcbfec3f1af3995a3840f7"
                },
                {
                    "id": null,
                    "fileName": "snippets/featured-collection-slider.html",
                    "isPrivate": null,
                    "checksum": "c524a7c07bf3c90690fbeb7e31f281295772890240dd63e2ad486e765b6f8b86",
                    "fileContentChecksum": "b27a89412bd22a3c5621369093d6bd1c89d1c01310ac6958d2869cdb03e3a439"
                },
                {
                    "id": null,
                    "fileName": "assets/cyclic-scroll.css",
                    "isPrivate": null,
                    "checksum": "cbaa4cc2a1bcfa498ed42f2a88c595211938bb62d23182ba70423c6a0be20128",
                    "fileContentChecksum": "b995d351e3621e17b8d9eff84c1b9e47a2c9a0360f495770d6df406cf6390fb9"
                },
                {
                    "id": null,
                    "fileName": "assets/section-product-recommendations.js",
                    "isPrivate": null,
                    "checksum": "6853f389bf59b966d7ad9b2801ca72bb7a3880cdf1bcdeccd15940fa7e012090",
                    "fileContentChecksum": "1e1469e90101fc13326468baf942861d35b898010bfea7ec8104618ce6628ff9"
                },
                {
                    "id": null,
                    "fileName": "templates/blog.json",
                    "isPrivate": null,
                    "checksum": "7f5502e38aa95aaf9fc4dd4e4abd15c1eb41a86d53bdb7d31fc49af4f22c8ea1",
                    "fileContentChecksum": "295bd79c62536d97edbe51f812e753b37106dc68d11451b13a15068992d81e61"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-location.html",
                    "isPrivate": null,
                    "checksum": "78517509596b20cbbe078dde52d116f939b9510b4e36fcc9cd6b1ab9283425fa",
                    "fileContentChecksum": "0a8c810398e79aef1e99553571c5b9502ce950f71ea8878a4276482679786b69"
                },
                {
                    "id": null,
                    "fileName": "snippets/product-photo-swipe-source.html",
                    "isPrivate": null,
                    "checksum": "b898701ef32247ea7eba70526ba7fd2c3d7927fa11049ba7a1a14652fcc720c2",
                    "fileContentChecksum": "ec9b9b751cd6ce567f6c343b7a1b7b6e889287568d956373223472fe115be04b"
                },
                {
                    "id": null,
                    "fileName": "assets/component-collection-pref-card.css",
                    "isPrivate": null,
                    "checksum": "1c4a99b2964208db07edb87d3a97cfa404437a7630ba150b0e85409119424102",
                    "fileContentChecksum": "069a7bbd773b64b2b05121d64b95679bd7c91ed696c6b9c6ec4dfe8b57f10a45"
                },
                {
                    "id": null,
                    "fileName": "templates/product.json",
                    "isPrivate": null,
                    "checksum": "8656939e89fed80cb6c07813ceab7410417c82c6c8adde7a48a6b7ff5e08deb0",
                    "fileContentChecksum": "1f1a2374c12356ed0391c62b8726c334dcf810ee4849536629af310592ae7672"
                },
                {
                    "id": null,
                    "fileName": "assets/component-dropdown-menu.js",
                    "isPrivate": null,
                    "checksum": "5681b690a06f8469a9e0e85f53352a85ec481e395ef7f3790a8432e5aa9b5cdb",
                    "fileContentChecksum": "f46a26698a75ad8759079e6ad9e292dca7f4c91ec22f8c3fc65098654f091f92"
                },
                {
                    "id": null,
                    "fileName": "sections/product-card-fragment.html",
                    "isPrivate": null,
                    "checksum": "91a73e775964c1d1db83f530b1eab0bc2b3b9658ce5dd5c686262e7a8c8b52ab",
                    "fileContentChecksum": "1ca2f7f0ca500e5014ab32c17334b23db169fe2ff26b98e4d0dff6cf92d1311a"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-edit.html",
                    "isPrivate": null,
                    "checksum": "a0001c2fe3805f062eea11f8788dcaf80ccf8a1e29b2043fe30e08b17970eb1b",
                    "fileContentChecksum": "1ddadf6533a968a751edca12a6c64a64438c06152df6d54fa25ce2c3c4cbc4cf"
                },
                {
                    "id": null,
                    "fileName": "locales/zh-hans-cn.json",
                    "isPrivate": null,
                    "checksum": "23081bc363f25eea44557855558e85ecc02cd305fcf489756d1ca2027dc65085",
                    "fileContentChecksum": "7f5ad8473469d298879fbee147cbb28092f79ca97b9c819e03915a4fb7f7720a"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-account-line.html",
                    "isPrivate": null,
                    "checksum": "2d088ff4c20f8715efa6cbf00ef2535ddcf4a28863465c2515d58bd3fb4b2967",
                    "fileContentChecksum": "9fcee62c1148e62d3f0bac33d48e82edec262ec22b75d6b16227a9313664ec52"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-zoom.html",
                    "isPrivate": null,
                    "checksum": "409e458dc8d39b56ab76c483beb22a8514534a04f4fd79f6d6585dff38fa7159",
                    "fileContentChecksum": "ece939f018a00e9f60a20612620fb9bc487e41e156f57fdf39f4bfaf61c1e36a"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-account.js",
                    "isPrivate": null,
                    "checksum": "547f5b29cf6506dcd3eae150c6f0516384042658765e9e7b04c6917d4501a901",
                    "fileContentChecksum": "cc7ca2805bf4d88e2ca9f69d263bcdfa08cdf9df4764f252fd99f2b87899a277"
                },
                {
                    "id": null,
                    "fileName": "snippets/cart-icon-bubble.html",
                    "isPrivate": null,
                    "checksum": "eeee8f8f7c7609bf8c46efffc195c67ff13a0418b87aa25ff4b05b1eaa040419",
                    "fileContentChecksum": "dc78a8b830279149c2e73caa6a61473ff56bd6a6869c93e6b1f607c6840b35cf"
                },
                {
                    "id": null,
                    "fileName": "assets/component-tool-tip.css",
                    "isPrivate": null,
                    "checksum": "325ee492d378add2198a2857f2b1a1df3c2a8a8fee5f4bda274cd749b20ba36f",
                    "fileContentChecksum": "c1da6150681ead1d220ee84cff5603a380853080c53ef5f67cfff873582f3471"
                },
                {
                    "id": null,
                    "fileName": "sections/slideshow.html",
                    "isPrivate": null,
                    "checksum": "e6e5a5304883cc31002dd78070f6be9b5ede5b6218ea57104b325f3ac8b24031",
                    "fileContentChecksum": "6f5a0a9145dd283d7f5b79c80cfb96a9dd9a142c6fb634e1a82d0769b75b957f"
                },
                {
                    "id": null,
                    "fileName": "sections/multi-media-splicing.html",
                    "isPrivate": null,
                    "checksum": "fcdb912909aaff441ea17f01f76537c54a330c5c8d9a00c688c1f5722dce2d3a",
                    "fileContentChecksum": "e99c4f89e9b17f02e3d08a993296a9db3bddd15db33b41fc3fe9e832f4c174e4"
                },
                {
                    "id": null,
                    "fileName": "assets/section-text-columns-with-image.css",
                    "isPrivate": null,
                    "checksum": "258ec3ae299773bd57cf4b17f17849fc46421b530de7e2dbe75bd3cad2362e9e",
                    "fileContentChecksum": "37d9ef66620c8f04923c4d62e0285b4aa94564e126caaf4f58b5b3ee938f5b9f"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-order-detail.css",
                    "isPrivate": null,
                    "checksum": "88ab42af84bc992378dbf3c6d4af71e68d051ad9bee0c37b001f8f43b4d1690b",
                    "fileContentChecksum": "7c9a5f1bed2d16b9db74c621f10dd4f4d01f457d0cd37b2e8280d3921d30a2d0"
                },
                {
                    "id": null,
                    "fileName": "sections/cart-notification-subtotal.html",
                    "isPrivate": null,
                    "checksum": "e0bd6f764404f690db740de4b5b56ebc99a04d227ffb18286800353222189f32",
                    "fileContentChecksum": "d91da65a8ac92696e2a6f8e6e436b21efa6338a281cf8bd0b82645fe283bb3c4"
                },
                {
                    "id": null,
                    "fileName": "snippets/switch.html",
                    "isPrivate": null,
                    "checksum": "5c964b5a1b2c95b62e026f7c8daf99f6bb5b89b7d8babd65fb00c44a56a0c445",
                    "fileContentChecksum": "5d77286b799fb8879b4d679d3686203d12b6c5eb5553db965c267ae8a545b7fe"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-addresses.css",
                    "isPrivate": null,
                    "checksum": "822f8c77c1d3bf9efcc1a5abe9ac0f8e17adb8c3397403b5048e75838f97548c",
                    "fileContentChecksum": "7daf3ef0e67ac997e59561c4424c3a496cf728e1ab0cc3e1af4f8abdf03f4b58"
                },
                {
                    "id": null,
                    "fileName": "assets/component-product-form.js",
                    "isPrivate": null,
                    "checksum": "8a29e6b5e4d48d7fe8725639cfe70ff402276d0b6861a7501814154dfbcfbeda",
                    "fileContentChecksum": "a7cffa6c1e9db3ff294fafbb8f9e7f68ec86b96da2ca261243ca573b7dac56a9"
                },
                {
                    "id": null,
                    "fileName": "assets/section-text-with-image.css",
                    "isPrivate": null,
                    "checksum": "41d8299bae0855d1ac9b5fb052f964c216338898803e0eb0eaf9ba746006b06b",
                    "fileContentChecksum": "92e90babd9255d8bf0623ef6b598f351b02e9c51508214e3d0c63125d3fafd06"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-social-fb.html",
                    "isPrivate": null,
                    "checksum": "607b7ddb24b09f441f5a4785dd22eb1c8b07384c9d749448a2b766905ffbad63",
                    "fileContentChecksum": "51d2338271634f80911399603689f7c4931418791e5d54c0d29fccc34491ce4b"
                },
                {
                    "id": null,
                    "fileName": "sections/main-addresses.html",
                    "isPrivate": null,
                    "checksum": "0044d22ba485b5963c514ed79c4b90f36a73c654530615b2979de75128e4693c",
                    "fileContentChecksum": "e37229fa65c8576121611c30a31a9314eff913758a2fafde3a843b8521367b2c"
                },
                {
                    "id": null,
                    "fileName": "assets/section-featured-slideshow.js",
                    "isPrivate": null,
                    "checksum": "f2494dc8938104b56f922bb4d9f380a7cd229e7fc128b9c06cffa80d2733a0d6",
                    "fileContentChecksum": "52bf7ebc90a2c8b3c4a9e894008ee8a1700fec856c698fb0fe2766ee2da99265"
                },
                {
                    "id": null,
                    "fileName": "snippets/input-email.html",
                    "isPrivate": null,
                    "checksum": "ffb1a58091deb580d6151bf2f8692a3f30135140cd0371e379a17c05bea8ee4e",
                    "fileContentChecksum": "fbe57226a5f0e6c4944f0494be89f7fcd91702f23ac40d01a45b8932212ef005"
                },
                {
                    "id": null,
                    "fileName": "sections/image-with-text.html",
                    "isPrivate": null,
                    "checksum": "eb3ec721c1b689eca21d16b28cb6d08e509faf10afefc406dfe58d9aa6bd159d",
                    "fileContentChecksum": "9175b85d8cd2545d5bfcb8251ef91c4ea87c1ff24300acc540ee1c983b5c14e7"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-account.css",
                    "isPrivate": null,
                    "checksum": "4a78db373fea6a268eaac49c0e50a8aad4db98016f105b8b784db20bf7154007",
                    "fileContentChecksum": "091812d654f543d2d3b025d1750b4b6f32e58ae4ac42b3a132d61fbc26419f49"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-logo-list-safe.html",
                    "isPrivate": null,
                    "checksum": "ce1a6cdf777c95a2717fa4304bfad05bb8f6f17989dd15b80ac63b47ad291706",
                    "fileContentChecksum": "3e6258c7a6de51a3f894d8840c4758036bb448e186b775fc587ffadb084f71f2"
                },
                {
                    "id": null,
                    "fileName": "locales/zh-hans-cn.schema.json",
                    "isPrivate": null,
                    "checksum": "7005d91749ec56f98c23b7dc2ed2d76e286311af4fc48d4565ee362f338a81d6",
                    "fileContentChecksum": "94cfd67a5df9f6952a2aaf95f3e3178c8175f864deed27d6d9639d487357ebec"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-page-tag.html",
                    "isPrivate": null,
                    "checksum": "48792851e31ceebd2526727fb0df063d23a15218bc032d4b136cc060128ae6ee",
                    "fileContentChecksum": "3ee44a1374890f10485e898f640b8e3bb4d5b47a4ea4f9be32619447fd5ec8c5"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-eye.html",
                    "isPrivate": null,
                    "checksum": "999e685537132ff0222bc6ed9fc7cb56be9791300cee31300fb7ff21b8c03e94",
                    "fileContentChecksum": "13cf2d75eb13c4fa7a587e38181f508c6dfa1feca482236aaf04aa44357ac5eb"
                },
                {
                    "id": null,
                    "fileName": "assets/component-quick-add.js",
                    "isPrivate": null,
                    "checksum": "cc06deb287dd0a2a24c4d1d5b93af8f7f62d20e7c2cd4eaeeb89471192ef0c33",
                    "fileContentChecksum": "2ae362f0d90e0b1bd079d43815e06d5efbe336e8511f7f2ec332297209327790"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-company.css",
                    "isPrivate": null,
                    "checksum": "81e2eb42166abbfe71637e4905b4b4eb302f88075ba57c3b20809a3528d01924",
                    "fileContentChecksum": "763579120cc339f0e841b09b3be2909684e9966c9eb3180acb3421be9534f6b8"
                },
                {
                    "id": null,
                    "fileName": "assets/component-product-thumbnail-opener.js",
                    "isPrivate": null,
                    "checksum": "9ea4f12a2c8fa0490b1e52f173702b2abe8cc2d7230df5983546fe8c648615a2",
                    "fileContentChecksum": "69b5ab639fc2f9ddc15a1ba6d646ccfcfac7f8056f15972a9434ab185c688514"
                },
                {
                    "id": null,
                    "fileName": "sections/main-order-list.html",
                    "isPrivate": null,
                    "checksum": "5c90a617077c61433e67d1f4a453e76f594276c4697dfa0e175cea0c94473d27",
                    "fileContentChecksum": "69fc63d98e0893c67003145ccf9872ab397967783dc63933a34a601e5e5e8278"
                },
                {
                    "id": null,
                    "fileName": "sections/shoppable-image.html",
                    "isPrivate": null,
                    "checksum": "edee8bd3812c3b57bcb929d8009c4105e03fb62da2c06c109a6eb12344472de0",
                    "fileContentChecksum": "570d715d068c3d12a5b6ddf5f7a3827a69ecb893320b58c299a91855ac66f830"
                },
                {
                    "id": null,
                    "fileName": "assets/image-password-login.png",
                    "isPrivate": null,
                    "checksum": "79c569c464e9011191878691125d90dc2518d8f2d2ce51f18ae232b965b0e495",
                    "fileContentChecksum": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                },
                {
                    "id": null,
                    "fileName": "templates/collection.json",
                    "isPrivate": null,
                    "checksum": "012b9b1ede81947292f05e6285bb46d6ec76714363c56fac703169cb3f54ca68",
                    "fileContentChecksum": "e4aec2213c39e847164614d5a07247621211feecc3f85389bbe96aee6d6a4d62"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-social-pin.html",
                    "isPrivate": null,
                    "checksum": "1a8b6ae0dcac27d4a6fd6359a430abc4045952af324f94dcac490694701b19dc",
                    "fileContentChecksum": "307980f377b3df33dcd9e9d607c9769aee2e36213ee02772272db00ed1aaf383"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-toolbar-social-ig.html",
                    "isPrivate": null,
                    "checksum": "94bb72dad8dff52a59872e884edebb13c5d41c4095ddbe27528568a3ee9b0a52",
                    "fileContentChecksum": "11be51a5568543e1c7c62c5b07ef7e5dc28a6c76368d93dfc0908234bc4e7257"
                },
                {
                    "id": null,
                    "fileName": "locales/de.json",
                    "isPrivate": null,
                    "checksum": "8d0d28a19f157eb1f80d46d96887800d962c2f43dfc02425dcbc6d2a3073f34b",
                    "fileContentChecksum": "44c0b8e3489abbea5211671aaf5f0b9b27d18463743b51fef8e07d7db82f098d"
                },
                {
                    "id": null,
                    "fileName": "assets/section-video.js",
                    "isPrivate": null,
                    "checksum": "501be0ae2055845e9933f646dd2f962212a5a958da1dd3dc856fdafb7c9d8294",
                    "fileContentChecksum": "5889fb90c078db04d7ff661263dfabfcc7fd1c54562d8d1de7a6d65d26775f75"
                },
                {
                    "id": null,
                    "fileName": "sections/video.html",
                    "isPrivate": null,
                    "checksum": "e13979839f06600ba408947b22381072552a2f6d1a7363759293b4896028bd9e",
                    "fileContentChecksum": "2346d4645230622aad2cc5ddfb151c40ecba5b5c90774c882b60014dbcdfa77a"
                },
                {
                    "id": null,
                    "fileName": "assets/section-dividing-line.css",
                    "isPrivate": null,
                    "checksum": "16914b7710e255fc58f5642eb77ea1f9b8cf2c5e65c09be15001887718d600b8",
                    "fileContentChecksum": "97986ff0690b8dc00e401258a6911be2f92559708ddde0a6618ff975060d7d0a"
                },
                {
                    "id": null,
                    "fileName": "sections/product-recommendations.html",
                    "isPrivate": null,
                    "checksum": "9e34b05a3109a734aad3b1ee1dde38300ede3399544fbc2daf4ed5ca00e56af6",
                    "fileContentChecksum": "6b6be447fb7e78e6cb6e195cc6ddb82ee7ecdaa7a1f86f32102aad83b982fd7c"
                },
                {
                    "id": null,
                    "fileName": "sections/announcement-bar.html",
                    "isPrivate": null,
                    "checksum": "af45e29564fc8ead7f0a2efdad081476a702049f8cdf62cfe201988b19fa7c28",
                    "fileContentChecksum": "0bea3be19a6aa055c654ab651ae6c078f52948b968bbb011612e9f9a142e3857"
                },
                {
                    "id": null,
                    "fileName": "assets/base.css",
                    "isPrivate": null,
                    "checksum": "34e23deb5d69b53f0d5f3fd28c2f3624f0e9ecd6c7667a89a19a6ee4bb815517",
                    "fileContentChecksum": "05b0f73ae292cade92415bb487afeca1a436159b5bd8c2fe2af80dbadc5387c3"
                },
                {
                    "id": null,
                    "fileName": "snippets/quick-add-button.html",
                    "isPrivate": null,
                    "checksum": "093c445ae4770b2dc846c82bfea4e51862839c7f85b6dc718b3a5a2eff72d7db",
                    "fileContentChecksum": "f178be40a3157fd6d1bfb5b41e78854bc66d0c058f3aa558f5789628f036ae1d"
                },
                {
                    "id": null,
                    "fileName": "locales/it.json",
                    "isPrivate": null,
                    "checksum": "43af332216a98f4fdde221104b3c1607ab681db20da2a5605e8163ccbe262b43",
                    "fileContentChecksum": "ec2608992db21de6217428751ecf53040324e5647f9ac37c1b50d0e2604a52a6"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-logo-list-green.html",
                    "isPrivate": null,
                    "checksum": "fdc9d1acc2a235f73571876561b60bce6e7a20bfaf8348c6f2fdcf4a2dad7030",
                    "fileContentChecksum": "42b8239efc446298520fd4426ddc802bb3c60d3969f7c7c192f5787a229e5d97"
                },
                {
                    "id": null,
                    "fileName": "assets/section-announcement-bar-slider.js",
                    "isPrivate": null,
                    "checksum": "f14444a78945e159fec59e51f3b8510f054deee4079dd1386c5dc3d9cc2c002b",
                    "fileContentChecksum": "f10374dde715283b227fb4bfaf9286486101ef4dcdfa5d20b19ad2f2f10327e6"
                },
                {
                    "id": null,
                    "fileName": "assets/section-sign-up-and-save.css",
                    "isPrivate": null,
                    "checksum": "7599361dc3baae45d184de7b6c5963c63e822f53f6a7ab813949f5343382a5d7",
                    "fileContentChecksum": "29f16ce708af71775087d1d2974541d8b5d582df103b295ec0a6cf2047027dd5"
                },
                {
                    "id": null,
                    "fileName": "sections/main-password.html",
                    "isPrivate": null,
                    "checksum": "554ff2499f51454c80f75154ccb2166d88f430f6a6b8b80228ffb53c637ec8e1",
                    "fileContentChecksum": "8821282503e0a6913d20d495b67934405b692e6a5517aff236289ccb6b9ff38a"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-register.js",
                    "isPrivate": null,
                    "checksum": "64aa06bf018014bc753d095096a50187692e182f8a90d5d0ce58a829e50b86f7",
                    "fileContentChecksum": "a2df389527737b891469acbcef956943c3e0f1907bd7c49ae809a593d8254873"
                },
                {
                    "id": null,
                    "fileName": "templates/customers/login.json",
                    "isPrivate": null,
                    "checksum": "d9607de94677b2625a14d236029c270834f511b7d0f450f418ffee9ddf12eac4",
                    "fileContentChecksum": "4181208141c26598739d79d3a99271b9031b93c2138bda4d50ad0984987326f0"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-toolbar-social-tiktok.html",
                    "isPrivate": null,
                    "checksum": "c787a7e26cbc1305e1fb8e732dd2486de0f44b921a4683a45348118ea7d73827",
                    "fileContentChecksum": "489135c60b4cbac7286c4e288691b4989c88b1991a2826dcefc6c273740a1cc6"
                },
                {
                    "id": null,
                    "fileName": "assets/section-collection-list.css",
                    "isPrivate": null,
                    "checksum": "c86901ea166efc74265695797a3849dac4bdcc17acbf833d474b998680b6cbe2",
                    "fileContentChecksum": "134d12e1e3975b550a292879daecacc3ab8bba3f22bd9b5d53a164358ca52276"
                },
                {
                    "id": null,
                    "fileName": "assets/section-text-columns-with-image.js",
                    "isPrivate": null,
                    "checksum": "a714869bcd20e5869d0010e2cfea2f67e310fe2af1136672cb73339c5af2f708",
                    "fileContentChecksum": "ac4c592f10a19eff321458c2c73f1a9067a8e6cc74e21d58cfda4c1b6fbcb256"
                },
                {
                    "id": null,
                    "fileName": "assets/section-picture-promotion.css",
                    "isPrivate": null,
                    "checksum": "8c25ff014bc5687bd95f6099cd50f143d9f7768362348751d24e623ac1adaed9",
                    "fileContentChecksum": "9156a2437f1e4d404b9353d8367417d717bce30f62e4e972374beb1c5607d15f"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-play.html",
                    "isPrivate": null,
                    "checksum": "7ad79b717c235aabb9a94fdc1338e003718b9f91657c086bf852fceef6fca981",
                    "fileContentChecksum": "c69665f915e5fe54319209329e41833ce6970456aee53b90a56e77a297356615"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-official-tiktok.html",
                    "isPrivate": null,
                    "checksum": "7fbb3929cf706b1825a2fd3ddb120bf491a5e479da85db821364b9365bf79f9c",
                    "fileContentChecksum": "aeeb7a53b8d8fa7671d93ac6ded815d7aaf26696319732181d493042de38f7b9"
                },
                {
                    "id": null,
                    "fileName": "templates/customers/orders.json",
                    "isPrivate": null,
                    "checksum": "26101dbaeff982dfe1da57344ff5c86bb841c52af51ac0b7cfddd58d3163731e",
                    "fileContentChecksum": "6f80bc5b12a67dad188efc12b8ecca950c88bbab5796f6702a72ecb5f0feac37"
                },
                {
                    "id": null,
                    "fileName": "sections/footer.html",
                    "isPrivate": null,
                    "checksum": "eb1c09601eec832843edfd83c8bedfe4222e89036d751f164ffd23b897e4192f",
                    "fileContentChecksum": "0f9bc4e0d4cc5dd5ff7994c85b2bee5b7bbd60ff141b8d833cdd8b4029a14926"
                },
                {
                    "id": null,
                    "fileName": "locales/tr.json",
                    "isPrivate": null,
                    "checksum": "dcc3622d0c1e28cae35e4e1c0dfd8765683ca39e4586318d615719e0b6b9df33",
                    "fileContentChecksum": "cc188a29f7abfe02b5bb022b1b2d7b7aae00bc47b2f7d70cb295d0dade02c714"
                },
                {
                    "id": null,
                    "fileName": "snippets/share-card.html",
                    "isPrivate": null,
                    "checksum": "c96b33cd8a424de54c6916e2c55f53f549bd8a37b7625a47057ad88a6a16f967",
                    "fileContentChecksum": "4b32b2826f64d7b0e6c964e2c3cf0c8a81b87a5cff373088a256314b5de3cfb0"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-password-footer.css",
                    "isPrivate": null,
                    "checksum": "5abc63d55bfb47283b5ad68c6b1f3836bd8f48f88e7418e88a89398373083584",
                    "fileContentChecksum": "77267259c5777d397c879c20d869502d3c272593ac751bcb3fe1d2f234dbf4af"
                },
                {
                    "id": null,
                    "fileName": "locales/pt.json",
                    "isPrivate": null,
                    "checksum": "3e5164acd57705e732ac01bc6f1b108d6961fe79920481e8b8066c05c75c9995",
                    "fileContentChecksum": "6bd84cc7d6f78bf00a47b9cb37068eba04ccc480619e198ada93c48ea4a37f77"
                },
                {
                    "id": null,
                    "fileName": "snippets/loading-overlay-spinner.html",
                    "isPrivate": null,
                    "checksum": "e39d23c778ae0963dfc62c773441aa4b37fa6122a8f8582964a504d5998345e9",
                    "fileContentChecksum": "6b4a139ef0229f6866011594f17d899fd156fda54b1195501df85a414d7710b1"
                },
                {
                    "id": null,
                    "fileName": "snippets/user-center-message.html",
                    "isPrivate": null,
                    "checksum": "1c360eb19bafc743088ae001b72bff7a84a564c92e41313da0048f1e5cdf9e9f",
                    "fileContentChecksum": "1891ca0628c6e3478085a52a01fbcf77123e442b73bc9854f934da9dbf4e8bd9"
                },
                {
                    "id": null,
                    "fileName": "assets/section-footer.css",
                    "isPrivate": null,
                    "checksum": "bc74958fffe257427f3c9160e2e321c40be4dbbe2471baa5d26a9ca262ad182f",
                    "fileContentChecksum": "7c49888ce2a346d5c22afac7a445b19f29ef023b1b55057ba777ca78ea3493cc"
                },
                {
                    "id": null,
                    "fileName": "assets/image-snatchat.png",
                    "isPrivate": null,
                    "checksum": "b1e27f8735f5c5fbf05059323cf2366cb94efc4f07cd417ee48ffe9349fd5620",
                    "fileContentChecksum": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                },
                {
                    "id": null,
                    "fileName": "assets/section-multi-media-splicing.css",
                    "isPrivate": null,
                    "checksum": "5106669c81583427f2d65e7f0f8d5b3a8ab74eb7e90d11e03727c552e96d9b2d",
                    "fileContentChecksum": "1b694e1bd44cb2d4b41cfa26b331d22bf6d756f7203add78d1cf70461e2d36b3"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-mail.html",
                    "isPrivate": null,
                    "checksum": "17c89798898a630bb2abfe6136287d00e879dfedd0f2623bde33b8f415bd0e2c",
                    "fileContentChecksum": "bdf958d702ff6b12db1868c3526081c9ab3aaeb169a06987c46a6db9b36b776b"
                },
                {
                    "id": null,
                    "fileName": "snippets/header-tile-search.html",
                    "isPrivate": null,
                    "checksum": "49d6387db4dca3047bb76d2ae21cae281d73bf643f7e8a337dd99f8d97b78b80",
                    "fileContentChecksum": "bea59922d2eb3ab740aa021fb31db9c7722fe49023bd8f093b95060af70e57e9"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-add.html",
                    "isPrivate": null,
                    "checksum": "642a86fb5e4f4159d7b852ea2a76b6d531337cb4086f929e54bb9c433bc9679d",
                    "fileContentChecksum": "272c8c6fdd3bc1c958d71dd6bdf9256119c717e7b4a41d6e913be0353e7a28e5"
                },
                {
                    "id": null,
                    "fileName": "snippets/price.html",
                    "isPrivate": null,
                    "checksum": "d68b3755fa37325ec2d3ac4c5cb76b8d823d094cb030ae1fe297e112de09b7ac",
                    "fileContentChecksum": "e57276d701079ac5708fcc74ebc3361f3dbb96a04e5896195036fad6c8b11ad5"
                },
                {
                    "id": null,
                    "fileName": "snippets/product-sell-info.html",
                    "isPrivate": null,
                    "checksum": "f0f2047ef3f2d661a9ba228bb301f0faaf5f26bda8c7fc30b2a561eb8aa17e67",
                    "fileContentChecksum": "0e5fc303f459200ca03dba0caf3a117848dbfbc4620d3da24091ad23b29692af"
                },
                {
                    "id": null,
                    "fileName": "assets/section-customer.css",
                    "isPrivate": null,
                    "checksum": "e2e90e7bc136f67894ea33a0420f39744324718cf1ff22805d67625e31d8bc43",
                    "fileContentChecksum": "a96bc16851c95b9c9a41658153f5fb205e1a1803ee9919ad24434b73fc689966"
                },
                {
                    "id": null,
                    "fileName": "assets/component-cart.js",
                    "isPrivate": null,
                    "checksum": "0d4fac52cbd5f2c0ef4ea9a1c0dae8bf17b7889a76cc61e5fd065ee36035ef03",
                    "fileContentChecksum": "83a2de86afedc70bff81a193ad17556c24bdc8ef7b9dc99448e7bedc559b2d16"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-social-tiktok.html",
                    "isPrivate": null,
                    "checksum": "f646b56d3fc54bf15831bc658aca8371c04c9a2e2d34faee598fddcf917e7ef4",
                    "fileContentChecksum": "818728f81efabc7f80b1d57b9f70f16ddce979dcea32609155ab54e06107fc17"
                },
                {
                    "id": null,
                    "fileName": "snippets/cart-empty-recommend-product.html",
                    "isPrivate": null,
                    "checksum": "cf0f1a890beb5e43668bf91bbde3fda3ab57ddc46a00c0d5a53736a41be3d043",
                    "fileContentChecksum": "ccaf6800a18a9f00260375e3b6cebea274372b900bb8ff55d77a7c2dacc50b0e"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-date.html",
                    "isPrivate": null,
                    "checksum": "5e307592efee16aea18ac3ae892b7614f71f47cba59d7257c9d93a9bf6c136d6",
                    "fileContentChecksum": "c24f35657ebdac7095ef1148195992a2528b23af7e69fa37086698e5fff9dd4b"
                },
                {
                    "id": null,
                    "fileName": "assets/section-shoppable-image.css",
                    "isPrivate": null,
                    "checksum": "2e0388f310322f6706d0b55324167d53b950a8064dcdb9ec079155100b48568c",
                    "fileContentChecksum": "69c647528ee5f596e825b434b65ef08c929b956b3e333f4708fdfcd3017fd06d"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-lock.html",
                    "isPrivate": null,
                    "checksum": "b9732b2a357914ed4f97b46d8f6e89f4b19d5a13e2533f0698a35aa97cab041e",
                    "fileContentChecksum": "c596cada7c1e5a4315831cc313f01b7b5fe1ee8213920ac52dccf6eca999aa5a"
                },
                {
                    "id": null,
                    "fileName": "assets/share-card.js",
                    "isPrivate": null,
                    "checksum": "aaf17053551f4e000e1e5c44c7be136e397757b25deca791f75202a7eb8ee3fd",
                    "fileContentChecksum": "eabeb47d4bbb517d3c5f858c699c0977a2fd9a6b5dc16ed910e6a2145d946085"
                },
                {
                    "id": null,
                    "fileName": "locales/cs.json",
                    "isPrivate": null,
                    "checksum": "2f85fd80df14258029e8a0a3cdff76a5959b45e0211e34db03befa9cc50c17b6",
                    "fileContentChecksum": "97e52fbe68ed26e62bef668c470fc469f4553ee436a0d3519f0a9311b41485a4"
                },
                {
                    "id": null,
                    "fileName": "sections/text-columns-with-image.html",
                    "isPrivate": null,
                    "checksum": "c303eeae2e78c7d064cd7e70b4dc3598d9400257794b03cda8965e6d71789ae8",
                    "fileContentChecksum": "9401c5f9f0f19576e6803e50ec565d903652374e60e65780fa9eb4eba9d6cefd"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-social-youtube.html",
                    "isPrivate": null,
                    "checksum": "504e4adccd788bbca82967989e40add072f5d0a5d9dc3e3681f47e7216126c31",
                    "fileContentChecksum": "a1f5bdcfb99c32aa0af9d9fc05fd8ad7871dc43aa02eb2e2586c97d7465eda2f"
                },
                {
                    "id": null,
                    "fileName": "templates/page.contact.json",
                    "isPrivate": null,
                    "checksum": "c4cf4e4e89a861dfd73edf3ad05dfcee90a7bd53246a20c1d7912154aa68bda0",
                    "fileContentChecksum": "0675c6b3a7a002d2070fe347ee62322e92f2ba6b9897d8deac6fb22bd16b5a59"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-pay.html",
                    "isPrivate": null,
                    "checksum": "ef38d5064ac42e1aa5d7910bf432f7e518cc947ddfbffc0ef4b5eecd5fd18275",
                    "fileContentChecksum": "0e30c82d04be1dcb6029a18edb8238fa116ed402eae746c28bf0b3170339c03b"
                },
                {
                    "id": null,
                    "fileName": "assets/section-announcement-bar.css",
                    "isPrivate": null,
                    "checksum": "1c7a7de1ed9dd7df7303553404e000741031b4e24c9cc54e7cc4a0caac77952f",
                    "fileContentChecksum": "6e54d519cd4123ea654934729f36a200a9b95681a7aedc75d365c56bba9e97b2"
                },
                {
                    "id": null,
                    "fileName": "templates/proofing.html",
                    "isPrivate": null,
                    "checksum": "1671adf579c7e17a8d8cc818ffe48873a9d77d4674a1108fa27be89ce1708651",
                    "fileContentChecksum": "e930db7731cd4951c30df28430a88a7af5c1c330b7f0b812daf0c9c59158f40a"
                },
                {
                    "id": null,
                    "fileName": "sections/custom-html.html",
                    "isPrivate": null,
                    "checksum": "61eb819400c39823abe2632d7641e07ffb5026fb3c5251abfec84d679153fd7b",
                    "fileContentChecksum": "fb9b0a871e35939f50def67f2d6c7dd1ef54d3f1985f09a63a9b77dceb8f75eb"
                },
                {
                    "id": null,
                    "fileName": "snippets/theme-css-var.html",
                    "isPrivate": null,
                    "checksum": "9ec121950a6825e09f07c10ebf6e46ba0c671c99f7bcdc7804ee5245b352c81d",
                    "fileContentChecksum": "325f4673389872a796e27c88b0df857281786ed84fbf25c16eae69f2bc83b831"
                },
                {
                    "id": null,
                    "fileName": "snippets/form-field.html",
                    "isPrivate": null,
                    "checksum": "bd1f2ff4f7e878beea6836faf48930d59327a2cfbcaa6f3d5386749429ffa12f",
                    "fileContentChecksum": "3baf2abefdb51f95185df977e918a72132c27581fe981f7939f57ced003f1722"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-delivery.html",
                    "isPrivate": null,
                    "checksum": "55a37706f93e46849d8caa3eebf3aaed1711afbf9877874ddd33bdc004c6cb63",
                    "fileContentChecksum": "9956e6a8b0038f6742952f68cb1aeeec287f47ebc952948b1c2e13e32d085b01"
                },
                {
                    "id": null,
                    "fileName": "templates/customers/activate_account.json",
                    "isPrivate": null,
                    "checksum": "c8da84f62adc1eb18ce0c5a815a0b35f516a93f71b680508b4131aadbab1c5c0",
                    "fileContentChecksum": "a8cd0abe96b590ef2136f8f04b45bb114f242620a3383f457e614ce5117390f2"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-social-ig.html",
                    "isPrivate": null,
                    "checksum": "4b1c01a4db5f7559506ec580f3d1d550326f1fb486e4d69cb596028d40b38499",
                    "fileContentChecksum": "4203c237e8246e1ecd15a65ba3c996d2d0b933584f5a226cd7108f6bd34da482"
                },
                {
                    "id": null,
                    "fileName": "locales/vi.json",
                    "isPrivate": null,
                    "checksum": "4242944a779831f7923d940c5682762914a2098eb4ffdc48c18be7a366fe648b",
                    "fileContentChecksum": "d8392e06da69a7106b3671e6ab24ec3e3444cbf28abca724c102e87f94f3cb44"
                },
                {
                    "id": null,
                    "fileName": "templates/customers/order.json",
                    "isPrivate": null,
                    "checksum": "b36319b466d17bc40d3c652c486742595c56bfaf961ec76ae502b4d696c3c2ee",
                    "fileContentChecksum": "396ec1eb7f9462feb725ed579882e690787a745219fb1e9e546cc74ac0d85fdf"
                },
                {
                    "id": null,
                    "fileName": "templates/customers/account.json",
                    "isPrivate": null,
                    "checksum": "803df2be06843b5dd8fbe3141d6106558ed2411164066371d702bc1f263c645f",
                    "fileContentChecksum": "eaf22406801f00142b414a9fbb73a05b2866ac0531501f8b3a6e3040f7e0b1b6"
                },
                {
                    "id": null,
                    "fileName": "locales/pt-pt.json",
                    "isPrivate": null,
                    "checksum": "ae4a5079bf6586c06388af58dbc798d25ac1ac3d030f1da94c0d41ce3f527e99",
                    "fileContentChecksum": "d6f625b7ffc2abc446c7f7bc70abde42da829b39953d042a4a6a2e409f143265"
                },
                {
                    "id": null,
                    "fileName": "locales/lt.json",
                    "isPrivate": null,
                    "checksum": "349105177c9f5b934d9d2b8235a88ebe6207ead1f31c89f8abf1b525144fcdc2",
                    "fileContentChecksum": "67b0fa7d771c888fa13ef0a8b0772b9fcefa2392cbef011bb91afc6ec8b22c44"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-conact-email.html",
                    "isPrivate": null,
                    "checksum": "4d778da8bc348358ed569ef603c9267fabb6ff0531c1ea149815b6325cb2392f",
                    "fileContentChecksum": "5de73e46b25a39d92a63ef61f641ef4d1a4504c4dc7bd81db8d988a245c3eb72"
                },
                {
                    "id": null,
                    "fileName": "locales/bg.json",
                    "isPrivate": null,
                    "checksum": "5ac0ae01823edb2a8968cd73db16f5dc129a869a0005cd599d44b9d17edfb059",
                    "fileContentChecksum": "1bb0da66d5ba044a41167a5ea24b150ad17f719a25d94f9333dac2031adf0747"
                },
                {
                    "id": null,
                    "fileName": "assets/product-float-buy-buttons.css",
                    "isPrivate": null,
                    "checksum": "6044482f7c22edd1fe58a95711d0ac5cedb7b080361f4932d24a3648689cb138",
                    "fileContentChecksum": "308f0308b36b9f7fdbde595629e5a47a36c178966bf74eff6d3b040b8c6e8153"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-official-snapchat.html",
                    "isPrivate": null,
                    "checksum": "d65448df4ecbcddfa759ce5c6bb32ac13596954706ca5c9e35c84a7fe193cefa",
                    "fileContentChecksum": "eb0ab1217fb30d7caae92ee2d888b4f86604b39eddf3e10509b418b76366ca76"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-logo-list-package.html",
                    "isPrivate": null,
                    "checksum": "abf3dd56ef3ceb99a0fc8d4290c09b046d19728c3ac1139041eaf789981c4f62",
                    "fileContentChecksum": "0838cd934e109c7858f127f5ed052d96b51871186772686e258cfa2c7ab691ef"
                },
                {
                    "id": null,
                    "fileName": "sections/featured-collection.html",
                    "isPrivate": null,
                    "checksum": "4b569ba4df57f61d794e5a6f32fe1476237683aa45d8ded174bfc29afff5e111",
                    "fileContentChecksum": "8d608308e0bb654b2695e989b487847cdda35f24e83d621d2d66833f783814a1"
                },
                {
                    "id": null,
                    "fileName": "assets/section-featured-recommend-products.css",
                    "isPrivate": null,
                    "checksum": "9ee074cdd782eef83f001beb0256a6a8e976f411006b81d20bdddb22495030e2",
                    "fileContentChecksum": "cad2cdf54edc05c2a7432162433ecbc5e67ba7a4d53b36f70588d0394330a3ea"
                },
                {
                    "id": null,
                    "fileName": "locales/zh-hant-tw.schema.json",
                    "isPrivate": null,
                    "checksum": "657a1d7c8ae76f065c7e47824b72c2ec4ac2cf190cc99b897acea3abcc44fe1e",
                    "fileContentChecksum": "c2c47fd741000ae9ce4a9447458c922f561aebb1778811e1bd38d1f3e9a656a1"
                },
                {
                    "id": null,
                    "fileName": "sections/header.html",
                    "isPrivate": null,
                    "checksum": "b281f5add671a198107f62346f5c26ebe9adfec1ad571579784d38e5f329cf3e",
                    "fileContentChecksum": "f608870b15b69454ce5ee55c98a2098dc9b69c8e372bc908cc41ddbb83fb0eae"
                },
                {
                    "id": null,
                    "fileName": "locales/ko.json",
                    "isPrivate": null,
                    "checksum": "d4b0a03a0f2bfe1e780fd7f194108a18eb1a116e56838530764cfc838ff1d6af",
                    "fileContentChecksum": "b10d1970e7eec2490186a4f8628cf2c21eed37405923c7923fa5c57054b747af"
                },
                {
                    "id": null,
                    "fileName": "snippets/user-center-navbar-container.html",
                    "isPrivate": null,
                    "checksum": "e6285a6d28e826d7b6c4ae244d09f650f041fc1d37d6e4621ae8d35f063c2904",
                    "fileContentChecksum": "277bb1d58177595f715d70cb5c72d6d6a2e46c12e5467a506fc1eba83d1297fb"
                },
                {
                    "id": null,
                    "fileName": "layout/proofing.html",
                    "isPrivate": null,
                    "checksum": "ac52d16a2a1d1e21dec8b8447ae7adf476fcd1aa73e3e080bfdf3e64fdd0d255",
                    "fileContentChecksum": "8368f654ad69eb7a8e1b9b3de6b217febdb8602fd9ab321e48ece048be625ead"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-account-google.html",
                    "isPrivate": null,
                    "checksum": "1bd19f40b204a4cb473c3581a9d1109706b80f6faf725ea921f34acd5fcf26a4",
                    "fileContentChecksum": "6c681f808e418b98de48bc619fc387bd846b9dea5a06810714b16e442ab12282"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-check.html",
                    "isPrivate": null,
                    "checksum": "fe76de87df93b02952cedd6c0319c99a77f0007b35a7bdf1df252835f9204300",
                    "fileContentChecksum": "d94054224dbe0afff4a7a502421a0e245a4d28a0e13597e3ef1c23a0a5a2135d"
                },
                {
                    "id": null,
                    "fileName": "assets/section-cart-drawer.js",
                    "isPrivate": null,
                    "checksum": "e127ef995529bf0ddbb29c5253a0b3791bfc7299a037af253c930c1193ca6753",
                    "fileContentChecksum": "6ff5c5bad64f1d55641862d32784c1979a3bd2e7ccee02e6f020bad09ce24190"
                },
                {
                    "id": null,
                    "fileName": "locales/sk.json",
                    "isPrivate": null,
                    "checksum": "dfbe57fdc5f83dec2ab0e6279c87bbd5f8606bd5610b3b599aee07b7df64adbf",
                    "fileContentChecksum": "57f7397058a736780b3f6f48f9cf4c457f18dd5ce80be4e92dca7f788a675b43"
                },
                {
                    "id": null,
                    "fileName": "assets/section-multilevel-filter.js",
                    "isPrivate": null,
                    "checksum": "d19e9b86d6b52776cc6f8eede8830eec64d8ea2e95621dd9810fc880a673a926",
                    "fileContentChecksum": "eccf0b2376a7d898179023a9080314919a436fc6c60d62f0a5e39196f0bd9a9c"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-list-collections.css",
                    "isPrivate": null,
                    "checksum": "b0da46e6bee75cfd4159517230cbc7f86092e52f391518cb4aad3fe12551ad37",
                    "fileContentChecksum": "3ae21dc07de6b95c4ea61d9ed5dff7a6b1c141c3981160fd7be22620f8e5e98b"
                },
                {
                    "id": null,
                    "fileName": "assets/theme-editor.js",
                    "isPrivate": null,
                    "checksum": "97c0574b34c100fc6b8d07f91203efc957db2ce7187f69ebe406b9d69523ee4c",
                    "fileContentChecksum": "bbb0c8f6239077b2b79dbbfb27f16b6d038398ce71722eed21d69da4a84f3101"
                },
                {
                    "id": null,
                    "fileName": "snippets/footer-logo-list-block.html",
                    "isPrivate": null,
                    "checksum": "26fd1ca8741c0716dcb132437d92fd46aa8971d79d4bf26e5199be48c20a8265",
                    "fileContentChecksum": "228924c43d2d2410238ae0adb6f19d091196a963d5e90b691659fa94f0052d13"
                },
                {
                    "id": null,
                    "fileName": "config/settings_schema.json",
                    "isPrivate": null,
                    "checksum": "50473cf55ac516aebd17e9309cf5cecbd6422f4ed56d680d60fee186773d2d45",
                    "fileContentChecksum": "4b4692ceac72bedb10952f8f84c014072bf6c5c5fa27c57ce066004aa6518fea"
                },
                {
                    "id": null,
                    "fileName": "assets/component-product-modal.js",
                    "isPrivate": null,
                    "checksum": "03b8f86aa607c71684d44ad9104fe62a7a7200dfe9b0b2ee08485eedd4fb043c",
                    "fileContentChecksum": "11322998ca4afdd0afc802e45de915f9dcc142cbbf8f802815162a755ca4210b"
                },
                {
                    "id": null,
                    "fileName": "assets/section-icon-list.css",
                    "isPrivate": null,
                    "checksum": "59044de267d8aca4900efa0f00307a0ab5506f43c2249520539a8bdbf51fbd87",
                    "fileContentChecksum": "547406d2efa881f0ca101e5da594ea5e616bde6dcf10ebcb89481fdb1a9351e5"
                },
                {
                    "id": null,
                    "fileName": "assets/section-featured-collection.css",
                    "isPrivate": null,
                    "checksum": "7bf39a617ee34fb9fbf30ccb86f538f0aaf993d1cfad82c99c387ca4e7dfac69",
                    "fileContentChecksum": "9bf3c42072329d0400f92b8acdedb51435fa9f662715769deadb0039aef74e1a"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-forgot-password.js",
                    "isPrivate": null,
                    "checksum": "d1ea07a754630b61ed608febe38ef91a6463b327af39644304c6a5a111c476c6",
                    "fileContentChecksum": "760f6fbc01c97f9f7ffb294da7f9f1a62fb90b7836359770354766fb47f47b9f"
                },
                {
                    "id": null,
                    "fileName": "assets/template-giftcard.css",
                    "isPrivate": null,
                    "checksum": "de932f7e95e4e7b93c67f426458ad01d69a934979b4fab5e1d9a1f8fbab9cdd8",
                    "fileContentChecksum": "e602d0d9d9d48ca119d6fb9f1567a97792cded77d57339f253d5c84fa6a01441"
                },
                {
                    "id": null,
                    "fileName": "assets/component-product-photo-swipe.js",
                    "isPrivate": null,
                    "checksum": "0c71508dab3d8f5f1ec62fc5ebc3c37f31db7aa7ec104978a1dd4698cef61f28",
                    "fileContentChecksum": "1d05d4842720c4592b4f1b32ce302a8f7537d048fdd11583710dad48239fa439"
                },
                {
                    "id": null,
                    "fileName": "snippets/link.html",
                    "isPrivate": null,
                    "checksum": "717792023dc48b49f9289a150dfdf9302e8e51fafd5c3d59afd7856680e123c5",
                    "fileContentChecksum": "8ad32c0a42a6b89dcdd63b464b97477362b0c011ff788356fdf97adb63857732"
                },
                {
                    "id": null,
                    "fileName": "layout/gift_card.html",
                    "isPrivate": null,
                    "checksum": "fc3dbb50bf86ae2c05eaa6cfe5ddf5b0375b3e90f48a174b38541b35d9f66847",
                    "fileContentChecksum": "f05c913b3064223e2228254d6adf5ec853bc7ce36ac64a4833265ecb2f021e9b"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-cart-footer.css",
                    "isPrivate": null,
                    "checksum": "dc02654fe0b3e05815b65d8c800017c72a0a6eb5a7922f0ed1210e51a0df64ae",
                    "fileContentChecksum": "d794c7f659979bcd690b77ee396c2bf3e704f2011837d81827ccdba604df3800"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-article.css",
                    "isPrivate": null,
                    "checksum": "00973de26f9cbd2a38ed398828de88497942dcf9fd37e325ce565e0df4cf6659",
                    "fileContentChecksum": "d3d6e86e0f7e62b581edfc5c0f157ce47b5450a1eb191985b090d3ad33e456a4"
                },
                {
                    "id": null,
                    "fileName": "assets/snippet-tips-card.css",
                    "isPrivate": null,
                    "checksum": "a9963b43b5ec5b64d5eeb5d8723392da68db03113ca66552784f9611a45f30f7",
                    "fileContentChecksum": "5e36cd3374d29c14d68967aaa8de82f9840fbba4110528bdad19e8e5ea9d8f90"
                },
                {
                    "id": null,
                    "fileName": "assets/global.js",
                    "isPrivate": null,
                    "checksum": "c101fa4ab8e33a2db19d3ea3f5fbcc458f97e38d3e8cd16febd26f9c24e9caf3",
                    "fileContentChecksum": "826cdd217c0a22d866062c6f91fc848a2712ed0cfa7538b25a5a740b9d9a2ac5"
                },
                {
                    "id": null,
                    "fileName": "snippets/cart-coupon.html",
                    "isPrivate": null,
                    "checksum": "41ddfa360ca47cec1cef08ce5f625ca64f6da14ccd60734ffb1f99b4d7d0375b",
                    "fileContentChecksum": "5cb1ebf1413bead003173a14b3a977354e1f6367ddd3c92ba86fabbc87d1e84a"
                },
                {
                    "id": null,
                    "fileName": "assets/component-count-down.js",
                    "isPrivate": null,
                    "checksum": "10c9cb18756c85fd1d94660d76902a91e75d07eb1982994b9c654dd6994f709d",
                    "fileContentChecksum": "3b3ac0a2e724f31c64c2648e476b64ccb11218e7806881bea9dbc167792b2a47"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-logo-list-van.html",
                    "isPrivate": null,
                    "checksum": "8a808cf41fd9df8337151cbb5f187f7a86bf1bd9113382b885e0275600f57e83",
                    "fileContentChecksum": "2b1e57c3bc834ee5efd19447e2a3de62d9a08a1567898472eb492afcf21e7758"
                },
                {
                    "id": null,
                    "fileName": "assets/section-collapsible-content.css",
                    "isPrivate": null,
                    "checksum": "98d4dd2d854fb8a0adb8ae75d5e50e839451b52ba1fb335a9fcfb21d776d9813",
                    "fileContentChecksum": "99d922703dfdcdba92248923d77c8604f2153b818165cb63ed24702d047f8877"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-social-line.html",
                    "isPrivate": null,
                    "checksum": "cb118c6c66bc7b249d7c0213cfe288da3462afb67374040023509cd89d46a417",
                    "fileContentChecksum": "0380594b8c5f7a523e5064a6758e604f32bb282d265a50622fba857d5357c37f"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-close.html",
                    "isPrivate": null,
                    "checksum": "e7b3f6e9858a2e88f555fe7037983c33f49aa02aa9036163b660fff7c0ef49fb",
                    "fileContentChecksum": "58466b869fe46b278244b3371544d82f4d2f23d73ba5952b7b359b0ec4d9af0f"
                },
                {
                    "id": null,
                    "fileName": "snippets/facet-sort.html",
                    "isPrivate": null,
                    "checksum": "5ded9db2aa374c354221299dde0b848d82828df430d3690e9bbe7356e7e01d4e",
                    "fileContentChecksum": "1497272876939e002b17701c4ed879a0abac853510273a37112a7b4e94f75c5b"
                },
                {
                    "id": null,
                    "fileName": "locales/zh-hant-tw.json",
                    "isPrivate": null,
                    "checksum": "e383f415b4a7d80c84dd44bd3571787af4424820ef11d0d041635213a844b6e1",
                    "fileContentChecksum": "736818caeeceda0e2a5c53da22e5d994b6cfd0f36268533448cd24f5a925b400"
                },
                {
                    "id": null,
                    "fileName": "locales/sv.json",
                    "isPrivate": null,
                    "checksum": "5bd1142d84f016557799dc6cbb24f3175891534dbf351ae64e7fd6ae4952e3ae",
                    "fileContentChecksum": "6a3bf007c22bd524c68d89aabc34a633dbfe813952cdc0605ddfdfed7cfda586"
                },
                {
                    "id": null,
                    "fileName": "assets/component-facets.css",
                    "isPrivate": null,
                    "checksum": "7dbf2fb58541876999cdd093da4fff9103086e1b34e075c77bd80fbf37f3d942",
                    "fileContentChecksum": "71094195011df5cb1aa78d74f2e67f3a367de86a12495cf3cd77a55742d52968"
                },
                {
                    "id": null,
                    "fileName": "snippets/header-gallery-item.html",
                    "isPrivate": null,
                    "checksum": "abb474e9b316fdb64461e65429a8069d6d53b7e5826d29699d30b4e4b588ccd3",
                    "fileContentChecksum": "894eb97e6eb3112e704d82cec47fd2ce442d0fa4828108dcac0eb334342838d6"
                },
                {
                    "id": null,
                    "fileName": "locales/id.json",
                    "isPrivate": null,
                    "checksum": "f6c8b46de44c9366c98a7a2a1a30e3ae3233e8e572e7377169cea073e68ddd49",
                    "fileContentChecksum": "492d1da8efb134a00184d58e9f0010a8b2cabaef47d2e69c315b5fbacce36885"
                },
                {
                    "id": null,
                    "fileName": "snippets/footer-social.html",
                    "isPrivate": null,
                    "checksum": "0e6c3b4f0af078e3e72f683f0bb59b098adca8e32a3fde20a4e7b9cd8182c533",
                    "fileContentChecksum": "756b299121216eb972357c3b495c3bed351b84fea60b23888ffb30ad07522998"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-social-twitter.html",
                    "isPrivate": null,
                    "checksum": "d487886e0b08cd70c9ee5cecdc8b9c7088f0761e2300b9a61914e9fa70e6fd41",
                    "fileContentChecksum": "a7adfa3dbb2dc742288b47bb7aa783cf907864b82d21460d1a6d628fa42c1291"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-loading.html",
                    "isPrivate": null,
                    "checksum": "b3e5deba37d6d9b14d4364b085ea73efd6dd204f6abd7cfac03f6f910b0e1940",
                    "fileContentChecksum": "d5e47a391d5befcf5ed14261ad1b8b1c877a9195ff0ef71b085b323e228ef769"
                },
                {
                    "id": null,
                    "fileName": "sections/cart-notification-product.html",
                    "isPrivate": null,
                    "checksum": "5623663d76a7acbe4717ef7eb832f7e58fc6aff00681956e05cb5352fe7f45b1",
                    "fileContentChecksum": "e0f47d9256f097b060ef52c7e1bda63ee8d9890f4705c1f45cd13aba34ab80ff"
                },
                {
                    "id": null,
                    "fileName": "sections/main-order-tracking.html",
                    "isPrivate": null,
                    "checksum": "cf2fbb2ac4faa6c9b1441b3a05df78b2980b74916570cb9fc8e7dd961b0425ff",
                    "fileContentChecksum": "14d65777a93710b0ffa3da93932514290b459b26df97db1401152758f8fd64df"
                },
                {
                    "id": null,
                    "fileName": "assets/section-collections-hero.css",
                    "isPrivate": null,
                    "checksum": "e80edd318fc2e25e8cfc0633b7c6b44248c3e43037d81ff66dc0de5e0da4df86",
                    "fileContentChecksum": "b05a63ff99597ccf3ea88f860b19d481cbd638e28fe8763e0c48d09a8136e857"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-conact-phone.html",
                    "isPrivate": null,
                    "checksum": "cd1c15bc79e6b81a4067a69ffd79771a3a197bf36f184c2dd4b88839879a70c3",
                    "fileContentChecksum": "420eab34da3a0215dd1a8934944f77e7c8992c650e99b49d5b07ab04057a7f75"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-social-whatsapp.html",
                    "isPrivate": null,
                    "checksum": "241e3dfd216796cf143d35c7021ca472db952ada8b2e50fef49cac61632a74ca",
                    "fileContentChecksum": "af9e0b12a359f1d32f5aebfa0cf99e83943a6fbd9bd3dfa299aed5752489f246"
                },
                {
                    "id": null,
                    "fileName": "assets/section-featured-slideshow.css",
                    "isPrivate": null,
                    "checksum": "ad8f858c20e618414f445be408cf7d9a01bbdcd5f7f45b93dd0713d9e499f345",
                    "fileContentChecksum": "ed6ecefe3c4318b3a94fc50c2589e037b7807a37c73945931851b44618383024"
                },
                {
                    "id": null,
                    "fileName": "assets/component-cart-coupon.js",
                    "isPrivate": null,
                    "checksum": "32f9957cd99095b9fed070b7b9da68cba6f815ae9408e6c716b2dbfe7cf2220c",
                    "fileContentChecksum": "5828f555c87c986a291e1d68dae2b067dd354ef2eb6907bc53916ed074b1fdcb"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-phone.html",
                    "isPrivate": null,
                    "checksum": "039159b225d0480ca7c1d79f875dee9210b663724fdce11be50fb6645fc37bd8",
                    "fileContentChecksum": "6b5ab8d39b41b4f9494a2f44564d8362d930293223489714a69c5087943b2348"
                },
                {
                    "id": null,
                    "fileName": "locales/hi.json",
                    "isPrivate": null,
                    "checksum": "3936111cbc62fe10a407c89ed87c31c9d6ca831e47a9fefbcc8381d2516bd48b",
                    "fileContentChecksum": "881c8512ce212340c5f697506089d271d78806be6009c562169f3c7fe771bc67"
                },
                {
                    "id": null,
                    "fileName": "assets/section-customer-datepicker.js",
                    "isPrivate": null,
                    "checksum": "2c3efd58500a229ba8ef5aba44c832ceccc6ca92de13437f5098bab4998209b2",
                    "fileContentChecksum": "e236c10b2e1d6460f7ec89743fcdd5dc1f43d9b31ee1867a5ed0a41f53112011"
                },
                {
                    "id": null,
                    "fileName": "assets/component-facets.js",
                    "isPrivate": null,
                    "checksum": "1ec601013d0df85a12b145cc3be23ea0ba58cf063fbc9c55e5962289df25606d",
                    "fileContentChecksum": "391882aa5b16e2656cc71c891583bef0292bd443c6da87e9b083824403fe16ae"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-official-linkedin.html",
                    "isPrivate": null,
                    "checksum": "27e041a094427feb231c1920af9c3106f0366d0f6256db89ecf26eb80f9f48d1",
                    "fileContentChecksum": "a1f43c62b2d1c1d412534d8a36aea07ca989d80b651c43d15bf94b7bffa0345c"
                },
                {
                    "id": null,
                    "fileName": "snippets/price-range-filter.html",
                    "isPrivate": null,
                    "checksum": "6cc4959b13749e8831f4375df9102f23bb0580958f84c7d66bd235ab4511cee6",
                    "fileContentChecksum": "29f9d4b47fb3c88705f9c39d88490b4416ccfbd51574b2846e97be5cdc083c9f"
                },
                {
                    "id": null,
                    "fileName": "locales/id.schema.json",
                    "isPrivate": null,
                    "checksum": "0d475def93060e9183dfe936aec550439ec9c093c0117a1091be1a67f226862e",
                    "fileContentChecksum": "a923833c405682850cccb466e3821830309a58263fbdc3e39ffc812f3adf66dd"
                },
                {
                    "id": null,
                    "fileName": "assets/component-price.css",
                    "isPrivate": null,
                    "checksum": "3587bec958e75c97ef19ad5a7614908a4163e036641c1fb07d73fbf451dfef1c",
                    "fileContentChecksum": "e8a64e4ebc0d442b5d9e84f4aa94c8f77619c3f3a6b67ee101f9f1c42d98f48b"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-faq.html",
                    "isPrivate": null,
                    "checksum": "8207c8f11e3c2f19a9c1b9719e30cb80d96df0c99aab01abe1b802970964a93a",
                    "fileContentChecksum": "f5eaf71cc118749fb51e0a5f4071d97c3888a3f4b8d244fbfb812007946a84aa"
                },
                {
                    "id": null,
                    "fileName": "locales/lv.json",
                    "isPrivate": null,
                    "checksum": "76ef5c27b0979af823203c492c5657ab0d5d8db34e05cad0a7a7061b9fdb56f2",
                    "fileContentChecksum": "658e1e253e6744ae7f457a83c8bcef6b4804eb3e184b8b167960d0371fae75c5"
                },
                {
                    "id": null,
                    "fileName": "sections/cart-notification-button.html",
                    "isPrivate": null,
                    "checksum": "5c645036baa1489169b7de068e14c3dbba30f8015af97057b1782955b91ef6fb",
                    "fileContentChecksum": "9713bb572ff2cbe968aebca1ebca83990b8adafc1ed95abf367cd52af2083b74"
                },
                {
                    "id": null,
                    "fileName": "assets/section-product-recently-viewed.js",
                    "isPrivate": null,
                    "checksum": "3320bb7f41f7d7a73343abbe21d8ed28680589585a8dae79428e3938b5efee92",
                    "fileContentChecksum": "594239672bf9b584ff81ca89e46e6d85f5cc439f1eff81bac5745b66c881c898"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-cart.html",
                    "isPrivate": null,
                    "checksum": "8cbf12e2af108234fd4d6ad46f36c5b1a22f98bb2fa98967c01c233e324bb6fe",
                    "fileContentChecksum": "510d04b45352107842a4e8d1bd003bf79f6460f520c0498e673cb7509d83b484"
                },
                {
                    "id": null,
                    "fileName": "sections/image-banner.html",
                    "isPrivate": null,
                    "checksum": "00c968138cb1bc7c32db327fcca60af9afcdb0ae0f26b81f294df6627a364718",
                    "fileContentChecksum": "f170f378e95059a0501ef705ed8211b0c4c696e180ae8d25bc49392a7db0855c"
                },
                {
                    "id": null,
                    "fileName": "locales/da.json",
                    "isPrivate": null,
                    "checksum": "4177c37281685dfbcb741432bb5d70e950ef8ac24fffd770c4951caf6489b110",
                    "fileContentChecksum": "d31bf6e0be1d4dda5cf59e30d3cad368a4a614f871341775c4f50f4bf0c693d4"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-cart-footer.js",
                    "isPrivate": null,
                    "checksum": "707f8d9b7e9644b3096e41009f19ecaa96b9d96a6232f060ae264cd76d21d9d6",
                    "fileContentChecksum": "5b6b68e808f2c2d067ee0aa6967080606724078e6b61626fdccfb2ad15deb312"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-order-tracking.js",
                    "isPrivate": null,
                    "checksum": "9d6a9df78411ecd3c4da163afbe759b258fc2ce4f7a83a631509f4c1b43bb541",
                    "fileContentChecksum": "680e65b8a002e65aa4688ecfba4d2cefc8ea7ded5a4dc7c0443e33c6abfddc2a"
                },
                {
                    "id": null,
                    "fileName": "sections/collapsible-content.html",
                    "isPrivate": null,
                    "checksum": "a96a9c62f498da664dc5054b0327fbbd5b6780e77ecd3304ff09ffece56ec865",
                    "fileContentChecksum": "e14d4ae93ae336f0162c8e52f1b3f76cc7b0141f70895fd97f12e03dd2caf450"
                },
                {
                    "id": null,
                    "fileName": "snippets/stylesheet.html",
                    "isPrivate": null,
                    "checksum": "067ffddbf3e3dbb9d8327173d0d36fdab5357961ea7c47a7c67e9c6173f52a91",
                    "fileContentChecksum": "ea141f43dae354ff6c5359e658838851333542cfb5734ee5570db6fb00b864a5"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-success.html",
                    "isPrivate": null,
                    "checksum": "e4b8435e21168bf4d1ed2d21486d78e14abe6e484b5b0775b65a119e3a570c15",
                    "fileContentChecksum": "c2eea9eaaae1ec81d30b13afaa3cad281daebdd67415bbb80c5c48aa206e204e"
                },
                {
                    "id": null,
                    "fileName": "assets/section-footer.js",
                    "isPrivate": null,
                    "checksum": "fef651c28a5f427cd138594505e57765dbf9957f387069a6deebc93692f2fc5b",
                    "fileContentChecksum": "76e1dc98d67fbc869af13dfe13f7a17f612869127343ce02f17db8c35c111e06"
                },
                {
                    "id": null,
                    "fileName": "snippets/product-card.html",
                    "isPrivate": null,
                    "checksum": "f29d334dd10b6cc929f6cbcc105c77936cecc6a4c04be44ecccb8b90cbced4f3",
                    "fileContentChecksum": "c2d3e5f1e7be3e085ffa37118458f3ec57ce88c4d63f59a85f26be53e2a28b0d"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-filter.html",
                    "isPrivate": null,
                    "checksum": "6509673744aeb0955415d93cdb5c7092078f81474fd0197d5eb19287b7204171",
                    "fileContentChecksum": "5d6ccf98045502467925ed0424380783a13fafa2c84ddbe1ee4022f47b441867"
                },
                {
                    "id": null,
                    "fileName": "layout/theme.html",
                    "isPrivate": true,
                    "checksum": "d1a2d56bb24b35e2b8a24059f58c95b1b3e1af79466cedf9ca71235d09e4361d",
                    "fileContentChecksum": "db4dfc5b37d260803bd0590fc29156ede5737eb57658aeef37b8196176967e55"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-sell-package.html",
                    "isPrivate": null,
                    "checksum": "506b9029d29e2394ec1502db0ea474f504ac7a3adede6e2954c3b3fba6610747",
                    "fileContentChecksum": "a10acbd05d7ad4d2b7ed2d5005a122427a9b57704e5cc646d5fc14994b15e910"
                },
                {
                    "id": null,
                    "fileName": "assets/section-blog-list.css",
                    "isPrivate": null,
                    "checksum": "7a1c8ca8049c2fbacf69efd8631096680c99b5e625d1c3eee7bc355e6845a52a",
                    "fileContentChecksum": "2d85e1c733e9d76f69692049c74f2e0d93eee1c27e4303f8afbe9a2fee7bda71"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-plus-hollow.html",
                    "isPrivate": null,
                    "checksum": "042deb97316c41619b9c5216785378a433cb67ed953feb1ac3e99bbd9e0f4178",
                    "fileContentChecksum": "cb0f295893adbb09d88c1bed646f81e7f8ec7f47631d566db55215329e6b7e9d"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-social-vimeo.html",
                    "isPrivate": null,
                    "checksum": "ffbea07646ec645ed7243ca2e2d27162192c7b6291a6439d7e5e0169365ca74f",
                    "fileContentChecksum": "98e90156986bb90ba4862017cce4f968388b9aa608aa6aea2b86c35a0503daae"
                },
                {
                    "id": null,
                    "fileName": "snippets/meta-tags.html",
                    "isPrivate": null,
                    "checksum": "7d163277ebdf14f12bb21b414bfb95f553e953fdab678f36da8975e7f7f69249",
                    "fileContentChecksum": "fbabae5f84fef27a88a9d583082bbe497466c774255297e77b6a1f09d128af47"
                },
                {
                    "id": null,
                    "fileName": "assets/section-picture-floating.js",
                    "isPrivate": null,
                    "checksum": "cf6d651502c8a333ee6f458c2c257925f9beed4850a3577d543074333517995f",
                    "fileContentChecksum": "bd2e173a112508b4a781736aae5dbe2a53ad7085b2c8ce9d8256052bda9574f6"
                },
                {
                    "id": null,
                    "fileName": "sections/main-404.html",
                    "isPrivate": null,
                    "checksum": "3499eee843853a200b5b5e4648ae212613696bd572cd04410f86cfbb665a9c6a",
                    "fileContentChecksum": "0aa7ee047a1786a293988fed007eda1815c51d4bb6646160aa42850f32a602b2"
                },
                {
                    "id": null,
                    "fileName": "templates/search.json",
                    "isPrivate": null,
                    "checksum": "0676b87c2d89ed65081f6fb1e6fb822886e7f8097b6be927aadd187ff09bab25",
                    "fileContentChecksum": "10e64df650d9f4957cf4243eb2457132c4c1ce2f1d7fe3b9e9f0bf34d3c624ed"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-logistics.html",
                    "isPrivate": null,
                    "checksum": "96828b36e9ab0d2bbedbcbbb89d49bf93ac569423f68b0959972ce26d43a0664",
                    "fileContentChecksum": "a9715c4b92b15fa758e79b425be8a20d6564f0dc0d1c1f22143aaad866d5c4cb"
                },
                {
                    "id": null,
                    "fileName": "locales/fi.json",
                    "isPrivate": null,
                    "checksum": "6a72ac65c4fa925ab06198f6fe0ad9e9c51050230c44f1b4de8102d6f33a9e6c",
                    "fileContentChecksum": "0d82e5f240e419ec732f8fb6e69eb41a98c53618342a00281781777ed261e21b"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-calendar.html",
                    "isPrivate": null,
                    "checksum": "a10859a31efc47b383f57104b5df8ec773f4e5846d040ff94c1ed6d486ed585d",
                    "fileContentChecksum": "9d4d26559310d1408c68298239c490ae58f86b323e31417e8e6a0eca957e68b8"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-cart-items.css",
                    "isPrivate": null,
                    "checksum": "b3cd7c00b5370fbdf8e421944dd41cc9814a43d067a71e4350b7fc7dbb9d9d81",
                    "fileContentChecksum": "3e8401d8eaa9501e2d13f9d164cd4faed361fdf7b059e3dfcef0368547a0bb9c"
                },
                {
                    "id": null,
                    "fileName": "snippets/cart-level-discount-applications.html",
                    "isPrivate": null,
                    "checksum": "d2e26279eaaa3671da4834f52e846b654d65168994b8b8777f5b5d45169879c3",
                    "fileContentChecksum": "2b1763abdcf70e84d8b8a72ebacc3a6806199129b5eb0f16760e864fe9c2c8c7"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-arrow-slider.html",
                    "isPrivate": null,
                    "checksum": "a3163d70e610c9e4a90af22bd946a30671d7baf660e3bffeb501818319277f4d",
                    "fileContentChecksum": "72f758e8c182f4173bd71e8ddf901b509db514c61e531ee2a091175cc7ca450b"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-logo-list-checkbox.html",
                    "isPrivate": null,
                    "checksum": "1064d281626715c277b269c4c9b50d45966bc608450a31291bb4678145b08689",
                    "fileContentChecksum": "1c823e282ec198062861531f061d49a09c6f9c59a733a1e50b9fecf95f31b985"
                },
                {
                    "id": null,
                    "fileName": "sections/main-cart-footer.html",
                    "isPrivate": null,
                    "checksum": "c16a7e38fb8e2c3bee53c607c9f8fca7623f3d2390b2d1264dd5661c4f35ad65",
                    "fileContentChecksum": "d3c3d5ea07ae1e39f04f07e00f40631a76559b846583d930c83fc2833b89d4bb"
                },
                {
                    "id": null,
                    "fileName": "assets/snippet-collection-card.css",
                    "isPrivate": null,
                    "checksum": "d45f85e271b947df04d53de366bccc33029fb2210ed0533cb40ebcd5d605ba1a",
                    "fileContentChecksum": "1df39a5ea4cd36c7a3c0e763b894d63c6debefa92a6f9c371c20c260c207c825"
                },
                {
                    "id": null,
                    "fileName": "snippets/shoppable-image__hotspot.html",
                    "isPrivate": null,
                    "checksum": "16adf779fa52137309fa31accd977800bbfa234ab0fb69c903d61044174ca9ec",
                    "fileContentChecksum": "3e9415609d47c260cc7dacfa1ed000ac62baeba141677ffcd8130a1b7ce6b8ff"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-toolbar-social-fb.html",
                    "isPrivate": null,
                    "checksum": "76ccf14ab1d8d59001837b5e2b467fef0c6eab7aec5227f02f83438910cb1a1b",
                    "fileContentChecksum": "a1aeaff9e3ea39bec92597ca1b58ac23e8cfc0c1abd7957235b2c2849743455e"
                },
                {
                    "id": null,
                    "fileName": "snippets/social-media.html",
                    "isPrivate": null,
                    "checksum": "76d9a02de7cf9a83e6c68ebf0931d0a06994d5ad4ea7dc12d25e15587a948743",
                    "fileContentChecksum": "5f5e8402893fd444c25873a0319d67daf466264fc6e01802b8e1c24cf34931cf"
                },
                {
                    "id": null,
                    "fileName": "sections/count-down.html",
                    "isPrivate": null,
                    "checksum": "b37861f0f6d6da150d24743cad5cb33ea125773263d45beb1f155ddf51f4e441",
                    "fileContentChecksum": "327730582c03edf51112e5b8ce3da5aeea06e878a68382e008dee414bfef9d43"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-giftcard-warning.html",
                    "isPrivate": null,
                    "checksum": "51b107b86d63f83e8caf9f114f8e7f2de683ad32d1dff65b6793479533ce8e99",
                    "fileContentChecksum": "7f1657f37073f0652d8f27bae4cf901341c3bcf64e594b91aa5094b2b1a1e5f6"
                },
                {
                    "id": null,
                    "fileName": "templates/page.json",
                    "isPrivate": null,
                    "checksum": "d7cc7924254917f8651cb7d780557fc56ccfc37e1593c8dbbb42e3117126ad95",
                    "fileContentChecksum": "ad8af6326698f9ab198d1feb0b4ff1d66ff553047691362c52f4482e756c1a1e"
                },
                {
                    "id": null,
                    "fileName": "assets/snippet-share-card.css",
                    "isPrivate": null,
                    "checksum": "6743ab2b2ea6c56b411105153da1cef2e9d7a8107e920330be42973bd9bb7af0",
                    "fileContentChecksum": "b5d4d881b1e9f6b5bd40dce53ad8183d9655367493cede4c3117260eebc679ae"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-official-whatsapp.html",
                    "isPrivate": null,
                    "checksum": "67543d7a625d04c52cc0ba6b0c9c81e6feacc772b2f453b53ce0f78262845e19",
                    "fileContentChecksum": "32f3416675695625e19c8b49b0db2b45d7eef573c7fc88d70d943b5dea0180fd"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-eye-invisible.html",
                    "isPrivate": null,
                    "checksum": "aa9f2a6d16e60a97fccbc1013458045f34473822c0311c13c7be42a376a13d4d",
                    "fileContentChecksum": "0fee7c1a05c290e828172f44f1747decfd8c616bb65c313ac605277ec5e7ab66"
                },
                {
                    "id": null,
                    "fileName": "sections/product-recently-viewed.html",
                    "isPrivate": null,
                    "checksum": "3e91adecd3d75572ec6af99b2dafb62da31383e7bf2c0c7121d95db9203deaaf",
                    "fileContentChecksum": "aae6527ad2dd3f8083b235e80de2a346c8cd7152c3d25188ab43670cdd945757"
                },
                {
                    "id": null,
                    "fileName": "assets/lib-splide.min.js",
                    "isPrivate": null,
                    "checksum": "60f626c6a0911b6225b46fc33d480e03c08c0456d5efeb71cd37cc3b0f668d23",
                    "fileContentChecksum": "aa815708fa50d95722e257559f97dc68096cf28c50e2291bc33f544f79141b81"
                },
                {
                    "id": null,
                    "fileName": "assets/component-contact-form.js",
                    "isPrivate": null,
                    "checksum": "d02689a3056ee76653afe5fda3edef50d166fc73671a57cebe02f504f7d7c2b3",
                    "fileContentChecksum": "f3f543c104ce04e39755719b65ecf2aa172315feb9e905faa177ee18a07573b0"
                },
                {
                    "id": null,
                    "fileName": "assets/section-featured-product.css",
                    "isPrivate": null,
                    "checksum": "3eb9dbdf85f3f4225de1570654c9d71b3a1ea78447a883641788a37254ea2971",
                    "fileContentChecksum": "b40407a076055619a775ad8f3b2d6e27fedd24dc7ff0b86ac3c7b6478e1f0182"
                },
                {
                    "id": null,
                    "fileName": "assets/component-address-cascade.js",
                    "isPrivate": null,
                    "checksum": "c94bc220000be1d9494106d7e3182c02f0f9ce4e0f2c8e045399018f90f57c2e",
                    "fileContentChecksum": "5035ab4a796729d22874b31ab5fbfc5a6b085293f0664d00f84787bfdfd8e4c5"
                },
                {
                    "id": null,
                    "fileName": "assets/section-image-banner.css",
                    "isPrivate": null,
                    "checksum": "62f8c518fdfe5496ff2cc6b0cfafea3b3cd2d0e84fe79160327627a610a57ca1",
                    "fileContentChecksum": "b5849106d72d252fc675406c13f2079cce1f750ceb7896c50550c63b6791bb4d"
                },
                {
                    "id": null,
                    "fileName": "sections/main-blog-list.html",
                    "isPrivate": null,
                    "checksum": "6fc79f2150634307205c59a5fd5e5dd6803a3d19fcd944d121428fa1782d9d35",
                    "fileContentChecksum": "4db160aa1c1aa5732397e46ac0ded49965ea658b7daadce3ddbd9c6a5daf3fc1"
                },
                {
                    "id": null,
                    "fileName": "snippets/product-variant-picker.html",
                    "isPrivate": null,
                    "checksum": "37f184a9f4dd29d906777003ac4f2b10ef87b4a4ed375b11eb76b4e7d9ff6082",
                    "fileContentChecksum": "4ef99fc4f829946a97886ad234b977c49d32c9a9ca738455e03c30d2886d8dde"
                },
                {
                    "id": null,
                    "fileName": "locales/en.schema.json",
                    "isPrivate": null,
                    "checksum": "38b9242fb8ace795d273e57c89d916c6b80d1a428bef7e569b0d77d942333c46",
                    "fileContentChecksum": "6c46408448ddf7e45bb23c7fc7aacccd5507b0c0c6f6012c5cd03967af1cf843"
                },
                {
                    "id": null,
                    "fileName": "snippets/video.html",
                    "isPrivate": null,
                    "checksum": "5a79391ff43c06696596e5435c711d90678a9fc16782a3c383dd2e44680853fc",
                    "fileContentChecksum": "b57883a2007f6b928dd8c8c88c74a0d2e17fbecbdbca20d643ad3d16e6506742"
                },
                {
                    "id": null,
                    "fileName": "sections/sign-up-and-save.html",
                    "isPrivate": null,
                    "checksum": "952ebef4ce5da8a448292219846cb5641cb8b961106b3e3b31645bc0dda571e4",
                    "fileContentChecksum": "fb2e651152824b011496d3e116eb32597dc7899fc9747b7b18cc93b9376a8001"
                },
                {
                    "id": null,
                    "fileName": "assets/component-phone-input.js",
                    "isPrivate": null,
                    "checksum": "d93bba17eceed35c3e825cbbf3caf6e1621f17443673c981003edb4423cc83d5",
                    "fileContentChecksum": "49fa8e4274d554528421227a4ed072b1dba671c48b5e426dad4af5a519e363c4"
                },
                {
                    "id": null,
                    "fileName": "snippets/facets.html",
                    "isPrivate": null,
                    "checksum": "bcfff3dc91730ef9ddea8e3c54487a021f87934b300dbf539cf50883d0fe5347",
                    "fileContentChecksum": "b43bb122592f3d1d837574a38fad499f7f2e6ac36c4be84fbc0783d76e67e504"
                },
                {
                    "id": null,
                    "fileName": "templates/password.json",
                    "isPrivate": null,
                    "checksum": "c7a98e30620341a849ca7c2d8e1493e624be582ffac7be51da0968dc06614aef",
                    "fileContentChecksum": "7431c261dcd85a1b0f98f0a3f251e0a935778f964f71897de2694960ab9ec510"
                },
                {
                    "id": null,
                    "fileName": "assets/component-volume-pricing.css",
                    "isPrivate": null,
                    "checksum": "658e061b10cbf714a1c0cf3b812205c946c60d4a859b9d6818cd53b3ccf2ddb7",
                    "fileContentChecksum": "1228d1ebca7bc35e6cc8d2283c1b6d2e01352313012dc57cbc770cadafc9fe2c"
                },
                {
                    "id": null,
                    "fileName": "locales/en.json",
                    "isPrivate": null,
                    "checksum": "dcda5a2b3b401a52d7fde73e6ac351a6d51b9ec756448f9ab4b6481a5888fad9",
                    "fileContentChecksum": "715fac01d812569300fdd80cac84a147e247071f167e5bf581758241dc17ba19"
                },
                {
                    "id": null,
                    "fileName": "sections/main-password-footer.html",
                    "isPrivate": null,
                    "checksum": "415efb915bfbfa21e3e8a733b5f8de9cb4cc7e5dd9518bfdf428eb8c8fc8a3c6",
                    "fileContentChecksum": "22444f973709a310eac93de79aa6d061e7c610b3b1ab8c77e45af03fbdcf08ab"
                },
                {
                    "id": null,
                    "fileName": "sections/featured-slideshow.html",
                    "isPrivate": null,
                    "checksum": "624b407f0c770aaa8de686c8c0f26729084e50b61168ed092fbbe32167050ddb",
                    "fileContentChecksum": "b225070857cc854dd4cc04dfdd071544c94b19e5e390b755401bf4713387ea00"
                },
                {
                    "id": null,
                    "fileName": "snippets/footer-conact.html",
                    "isPrivate": null,
                    "checksum": "cb4346f6e422055f0eee9d9fde20da4bb835399ce9e67dde48883ab65f589d86",
                    "fileContentChecksum": "6655b90acc6a9593cd75c029d21373fcc42e10ea3ed75dceb580fd9627827271"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-accordion.html",
                    "isPrivate": null,
                    "checksum": "24f3afd0724404777f0efd8b6840bb0c0bb012d0102db91fa189528362c12881",
                    "fileContentChecksum": "b275dbe17a7a44bac0908ffd0a7aba96a552434a9eef4c8f2b5ee03a9ebccd47"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-sell-globe.html",
                    "isPrivate": null,
                    "checksum": "6e0d897167bc99db3b74636603d18aa669929392d5822c7fa6c803769e9a58e9",
                    "fileContentChecksum": "3636501b30b7caf409b4b4588704ea4bfee29c654ebefb98c5b8228ac0207fb0"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-toolbar-social-tumblr.html",
                    "isPrivate": null,
                    "checksum": "398ef834a2e8725ab276e3de175fc07060bdb98e95e25cd9e922e115eb4833b8",
                    "fileContentChecksum": "54e36e100653c9d61878048f01535189570cf0be4fb08b3a3c365d91460170b6"
                },
                {
                    "id": null,
                    "fileName": "assets/component-checkbox-group.js",
                    "isPrivate": null,
                    "checksum": "1b26445a83ba102af0c785a803444d70c7f3477ac79cbb869d440e146dcadc47",
                    "fileContentChecksum": "14a74a331e6561ab1f06243ca5ecd77e0ee743f549ff6ad1e99a770ef4abf320"
                },
                {
                    "id": null,
                    "fileName": "locales/ja.schema.json",
                    "isPrivate": null,
                    "checksum": "dc91fa766f8aeca5728846157c08288d83d74231a489c83ac7a203c1abba7c57",
                    "fileContentChecksum": "d08fee5b373dfa458e4de54031ea8fa98c9e48c04600948954aad774a7727cc2"
                },
                {
                    "id": null,
                    "fileName": "locales/vi.schema.json",
                    "isPrivate": null,
                    "checksum": "2dfbb8283ea7501eb123de8d95057c4a0a95664ed5e761c9165c9741bd9c96bb",
                    "fileContentChecksum": "4617014fcf10a4e7a5518ab87a12ebf64a8fb147a2c38506f459f0feb78147d4"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-product.js",
                    "isPrivate": null,
                    "checksum": "bcc2682e0b3fc8d1106f939d6d53d0448c0302a510006f89706d6363c30cc8a8",
                    "fileContentChecksum": "9e0193b1e7dfaa1c54706a6422d0c2677abb5ceb4252de2358f6a07bdf0064a1"
                },
                {
                    "id": null,
                    "fileName": "assets/lib-photoswipe.css",
                    "isPrivate": null,
                    "checksum": "0971bad4f90bb53ceebf9981423d64e82e0fc2477a5af63ce649eab9eb3a16d9",
                    "fileContentChecksum": "441813afef99d842a1ba16e4e07ea00ced6c32ee85a22b6491262457a8b807b6"
                },
                {
                    "id": null,
                    "fileName": "assets/component-media-gallery.js",
                    "isPrivate": null,
                    "checksum": "8b960088c9344b0972b578da0d92234f9efb2f993310b2db673615f2279f25af",
                    "fileContentChecksum": "71472e814eb665ce1ba0ebb12e2baa19205e9589e7ae98c4c2eeae709750273e"
                },
                {
                    "id": null,
                    "fileName": "sections/main-login.html",
                    "isPrivate": null,
                    "checksum": "af954e1de9b264e0af8203ca7c86210c0efa5d3dc4216a7010cad3a992668e3c",
                    "fileContentChecksum": "ce6a86bacd8165998315a3b275dc10bed24afb9ffd00b47e3fbb3c041dc25b17"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-caret-down.html",
                    "isPrivate": null,
                    "checksum": "670514045a90ff0c1c60232839d8ab2ed64f70a125c35c0e95d54fa53fe06fad",
                    "fileContentChecksum": "1d651dd1abd48a564f783e97f7ee7f83050deeaaaefeb2ca17b35280a3828b3e"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-order-tracking.css",
                    "isPrivate": null,
                    "checksum": "eeb551c4dff8cbda0d29fd31f608e7298ee5638e5ad45030f66ee5a3f3b242be",
                    "fileContentChecksum": "d480d83e7608985d529730bfa120c1503d99df58ad991d4721b0800d8173be51"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-official-vimeo.html",
                    "isPrivate": null,
                    "checksum": "c9cd97a3ceb80f94582a8a6aaf7e267e119cec85947ca09cf84cf00e8f4590bb",
                    "fileContentChecksum": "86a48f7df6aa6f66571593eaeb28bff13b24ea5b864cf24324c9d6639a671a15"
                },
                {
                    "id": null,
                    "fileName": "assets/section-shoppable-image.js",
                    "isPrivate": null,
                    "checksum": "c559876d612fa90c21fda7aead40447f3c23488f6c9fe7506e88939743926d59",
                    "fileContentChecksum": "6adfe6b11ca7f48a94b44f3ccbbc077b8ac0d43e5672815e6612f6ea46ee4f5f"
                },
                {
                    "id": null,
                    "fileName": "assets/section-customer-lib-rolldate.js",
                    "isPrivate": null,
                    "checksum": "8a347139daf1acba3f9c40cbaa51e61774d6b35443da57a840feabe4fac295b3",
                    "fileContentChecksum": "1d8e7ac1e99e00c2f18eb6413ecdc4aca32212ff19b4494f10dacb13eb231d44"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-sell-lock.html",
                    "isPrivate": null,
                    "checksum": "de5e5e772f105251c267bc5ab06d709d44d2c168880663a23f18617d9f973499",
                    "fileContentChecksum": "1d09195cdb0fa6850cfcc47517032a7cf780d4d3ce4f438db875a9d192933488"
                },
                {
                    "id": null,
                    "fileName": "snippets/cart-icon-bubble-mobile.html",
                    "isPrivate": null,
                    "checksum": "5af2b6ef9a4ab0658fc51d1ca0afc06a846760983f9ec385106e394a3b2523be",
                    "fileContentChecksum": "58b6540a226fd7cdab5545c008aeeb69bce4c3c71236bfd4e212406076e7825f"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-menu.html",
                    "isPrivate": null,
                    "checksum": "4dda8ea4e04c662458333dcc7f93a4245ba2ef9306e573dd00644b6cfdb8c40f",
                    "fileContentChecksum": "c37f8411dfb8f85a558d415ec4fd31d754051f4137970a668402806cf5411ab9"
                },
                {
                    "id": null,
                    "fileName": "config/settings_data.json",
                    "isPrivate": null,
                    "checksum": "ff2bded0091080cd8f42a0401ea53ca7b791a498ffb4a5b65784519b5ca6794e",
                    "fileContentChecksum": "7d89ec10e81f736d2e120a8ca9bb13a2d2fc7b19ed504e797f099d1aaf1f92af"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-delete.html",
                    "isPrivate": null,
                    "checksum": "70fcd0bb788c0553e3f4f929e2857da831075be22647bc5898a80567945357d2",
                    "fileContentChecksum": "86356699bfd20885cca5e2ab12a4eab22c1e0c72757868bbc96db18eb0cc427d"
                },
                {
                    "id": null,
                    "fileName": "sections/main-list-collections.html",
                    "isPrivate": null,
                    "checksum": "f126f6a83e91377868e2ac32549c3d4700b3bf26c2999a680284783e877c0bf4",
                    "fileContentChecksum": "b2dc8022b35e069a3631851bb06752577977466e077aa539e1e0faedb0327dec"
                },
                {
                    "id": null,
                    "fileName": "snippets/product-buy-buttons.html",
                    "isPrivate": null,
                    "checksum": "61a29f98806b059cf0492dde3056292ad82bec331565b7c1d81bab4c17edca09",
                    "fileContentChecksum": "a1bce503f72b2c1bcaa5dc6df55fa5853e4ee32492337a3890213b0bb98fdca0"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-official-line.html",
                    "isPrivate": null,
                    "checksum": "e2f1e56e55edbd1eac536a43ef38fc582305ebcd0833dc675b2f078b37d152d4",
                    "fileContentChecksum": "b21497008a5745255a877506bc8b1f6703d03de3f17fd2c74fa436812fe85f0f"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-social-kakao.html",
                    "isPrivate": null,
                    "checksum": "8348a4d49129b5dd337cbc233ba79a682099aa6f189a3732ae39d7e6c7c23536",
                    "fileContentChecksum": "9a56fb5a278e892d1b2ee8f615a15f4afc8432868854959cd8452cef80e7fbba"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-minus-circle.html",
                    "isPrivate": null,
                    "checksum": "d9e31b78c5cfd30f5538d090142ced2945a99c23000abfffa9c2acfa80d94d9c",
                    "fileContentChecksum": "e6af1209111ee68df1b67f0b60b97eafefbad6732afb3a7a7ac217f1d0cd24d6"
                },
                {
                    "id": null,
                    "fileName": "snippets/header-menu-drawer.html",
                    "isPrivate": null,
                    "checksum": "7b611a11f1110537c55b6a7c31ee2c752507751aa3344420290a8b23cd66e3e1",
                    "fileContentChecksum": "9924ac4a4c76bd5e4736ff2cf1630a7f7ee35b38844e84304fd7c6e2a63d7e12"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-product-media-gallery.css",
                    "isPrivate": null,
                    "checksum": "1c669c076053f8bdc844c58a69a9950f909018cb1093967b84528ff3ad685572",
                    "fileContentChecksum": "052f29e2857e792cd58c3bcaa145de85565729784020cb351ac57b8fbbfbd819"
                },
                {
                    "id": null,
                    "fileName": "sections/main-search.html",
                    "isPrivate": null,
                    "checksum": "cddaf4ecf606824c2c3e78047813610140898960bff3b0564c6c8893cd71cf2a",
                    "fileContentChecksum": "78e285140bd467f4d3c0a031932c49c7f9bf2e8866e0ce175c73a29113d96fe2"
                },
                {
                    "id": null,
                    "fileName": "assets/component-card.css",
                    "isPrivate": null,
                    "checksum": "25e9587811fe624ee8c09479dc65efc268a5d42932f9e0b5fd46ff6d95c2c4ac",
                    "fileContentChecksum": "3de18b6f0698b17c5a6898d9516b4d6f4b1cfa98048f9338318d081d637fd50b"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-quick-add.html",
                    "isPrivate": null,
                    "checksum": "f256c64f692a5704154d464122cb339455d6db4aac0bfe6d708bdeb15af3f969",
                    "fileContentChecksum": "aa543678e7aea9ecef19802694f13a505866e413e9c1eb704c3a28ca3d834ab3"
                },
                {
                    "id": null,
                    "fileName": "locales/sl.json",
                    "isPrivate": null,
                    "checksum": "2f4b5fdac29dde947c737e5d43909435ae05932038e7c67fb450f74ff19dc054",
                    "fileContentChecksum": "d4d4e2bcfabcc83c77db32458fb6a291142ea30243b3842be00a0f1b3e9ff7de"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-toolbar-social-kakao.html",
                    "isPrivate": null,
                    "checksum": "3d51ca27cb4455fec200957422d41a1ed6181b482169cae45e47ecd67db6e0fa",
                    "fileContentChecksum": "414100e163588222df628adba10fdb35cdf2d52e7d56065524bb296849265634"
                },
                {
                    "id": null,
                    "fileName": "sections/main-register.html",
                    "isPrivate": null,
                    "checksum": "38c8668305ac886098d2783246ed6b76d7c6758cdd62bb5cddca1895bea5badf",
                    "fileContentChecksum": "22fb6296eb40a32ae3641423305354aecbb43a48c383fbb2c1ee770244d2f97c"
                },
                {
                    "id": null,
                    "fileName": "assets/section-blog.css",
                    "isPrivate": null,
                    "checksum": "900498a7abd0e65a3960de3c099c4d6621d216748fc3221668b309915fa0a198",
                    "fileContentChecksum": "cc3dda236b8cdadb92cd2e97bd307136ad75cb8055cdd291042de0e42d86a03f"
                },
                {
                    "id": null,
                    "fileName": "sections/main-forgot-password.html",
                    "isPrivate": null,
                    "checksum": "54f7bf017e4c4b027e327201fe71e1a70b9f5e6912629d6106fd409301044fdd",
                    "fileContentChecksum": "44b7278df6174fce24103f7ea2afdb4aac0b72dfbeb73e9e66cae0af92631149"
                },
                {
                    "id": null,
                    "fileName": "sections/main-collection-product-list.html",
                    "isPrivate": null,
                    "checksum": "320b0af22ae5c7894258678fab44b247b5926f6a5da5331e5d51e6b3589807c1",
                    "fileContentChecksum": "ebe71659978499a364f6bca977b14c7d265645be12c39d5b9d243c22047538b2"
                },
                {
                    "id": null,
                    "fileName": "snippets/header-gallery.html",
                    "isPrivate": null,
                    "checksum": "02c3f2d0e2a2ca779ac767ab0f392cf836e9105588b795625390982aa1345503",
                    "fileContentChecksum": "6f3b8a657fbe9d3dbd7fad6d06656bd5e3fdb7fce2517dbeadf4004658b242b2"
                },
                {
                    "id": null,
                    "fileName": "assets/color-swatch-default.png",
                    "isPrivate": null,
                    "checksum": "7382a45f9db03691ccabc487a13a1411e80c2bd7d26e8b194b8d37c5e25ccb78",
                    "fileContentChecksum": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                },
                {
                    "id": null,
                    "fileName": "templates/policy.html",
                    "isPrivate": null,
                    "checksum": "1f3cef7a16fe1e81dbaf761d6663beec23ef996e91f3adeebde6f243a3a2856d",
                    "fileContentChecksum": "8cd4c194431a1dbed1e1e52b0d6cb20ed8ded9596d6caa1e665a3bc69cc18ab5"
                },
                {
                    "id": null,
                    "fileName": "assets/component-cache-breadcrumb.js",
                    "isPrivate": null,
                    "checksum": "b3e672d6541a20201e21c16b83866eb7b6ccbafb8574fe78f839c77f76ee294c",
                    "fileContentChecksum": "b9ae16990a37e3041ea994af4345d734ac994959211c8375928a798d45c3973d"
                },
                {
                    "id": null,
                    "fileName": "snippets/cart-item-quantity.html",
                    "isPrivate": null,
                    "checksum": "9179138a51c9fc0e2f9688a1c970459609b6999da64d2616441381431efcc327",
                    "fileContentChecksum": "aaba856f1399a792e9b4689304d795d1eb0e4f02417d063d4dd76ef8160eba0b"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-password.css",
                    "isPrivate": null,
                    "checksum": "0e2c60dbf67190a4225ebec00ee07c51145fa512c1fe4922fdca2bf6ea0e558a",
                    "fileContentChecksum": "3762751e9793b5cf0d6e18bcf908a9c54abd6945221ed05baf984b47d74a5b09"
                },
                {
                    "id": null,
                    "fileName": "assets/snippet-cart-item.css",
                    "isPrivate": null,
                    "checksum": "9137ccc26744750da95b5aa454f95dbe1c0cf4b673ccbb5b6c8c8c079a851a58",
                    "fileContentChecksum": "d80816b7df5cd49d251e133abb9e8dbec0ee131eb22ed6721483df75906b1163"
                },
                {
                    "id": null,
                    "fileName": "assets/component-cart-coupon.css",
                    "isPrivate": null,
                    "checksum": "492f16ba6c3de1645f30e84f47060ef4a08b2a16c1d658f24a6edff88e3f6eb6",
                    "fileContentChecksum": "0114a7496936443cb279fe371724cb33328fd717620732fc5ca613440e2eae74"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-conact-wechat.html",
                    "isPrivate": null,
                    "checksum": "2e9d27b04ae586e758e3a144a3f7e2b15790d235652180ae8bc80954547d646b",
                    "fileContentChecksum": "d87972e46675744818924b8499b7ccabacea23c1e5e48997c38ed211ce2777ed"
                },
                {
                    "id": null,
                    "fileName": "sections/collection-filters.html",
                    "isPrivate": null,
                    "checksum": "0f9b9b17834a69f737d779afee56e185c58943d549b471c964180ae95352d150",
                    "fileContentChecksum": "696f6a43302628806dd85de39adc1a822e73285fe800feb000ba9bcf506a4713"
                },
                {
                    "id": null,
                    "fileName": "assets/section-picture-floating.css",
                    "isPrivate": null,
                    "checksum": "fb72214fee04de57ec4b825e58d45482ed65473a4f1d2dcb126a471c0c3629fb",
                    "fileContentChecksum": "d8d26df8396a495b3ddb217cf13b866394032957b57efafc5b4a1efb07e6d8f3"
                },
                {
                    "id": null,
                    "fileName": "snippets/pagination.html",
                    "isPrivate": null,
                    "checksum": "ae293f8aabafedfc0c90da83e0859e08575c6028c09b7b1cba5cc38370b60d37",
                    "fileContentChecksum": "754865a31b28eced6934fa7747afb66d0ac9299825016be6d0450ea3ba16d086"
                },
                {
                    "id": null,
                    "fileName": "snippets/quantity-input.html",
                    "isPrivate": null,
                    "checksum": "2494be05c277ce335fcf50ac2a894f53c933d6f5e72efe1692aee47dcaf3b0d7",
                    "fileContentChecksum": "a43e42c0edb71fb176070f9252562a96f36d763723b7af7fa9ede35b67225b26"
                },
                {
                    "id": null,
                    "fileName": "assets/snippet-cart-fixed-checkout.css",
                    "isPrivate": null,
                    "checksum": "aea07fe58c88ea2c6c8c8619536eb44fa8ca1373bc6d637504dac8d95bcf6441",
                    "fileContentChecksum": "810ea17682c30c058058c1a224d34da50f1546513fd6ba015b6b479242122fad"
                },
                {
                    "id": null,
                    "fileName": "assets/section-customer-lib-air-datepicker.js",
                    "isPrivate": null,
                    "checksum": "8156f361b5fb819e80aa3d39f38a1cb1c91397c6c8537fb56a22af3e897bc7e3",
                    "fileContentChecksum": "4a36976064886a9b47e0bfbb6829aafac460a261a13fde79845ae7d5ae33fb97"
                },
                {
                    "id": null,
                    "fileName": "locales/ms.json",
                    "isPrivate": null,
                    "checksum": "a2d45a6338d683459c3cc25b59142f80b0dba36f2e5b5141260a10edb8ffc23d",
                    "fileContentChecksum": "9130e31bb10b622ec6f21a7a5453acb22ba5d34f3a0ff8b2d5349aff0dcdb134"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-minus.html",
                    "isPrivate": null,
                    "checksum": "136e43c2ece68fe741e8cbe6da3638bff2d9ec0ca0921adb051182c099822072",
                    "fileContentChecksum": "3cedfce20385380d2fec0b524c19e5cd24a5c343990ba448f78a3fc73d50737c"
                },
                {
                    "id": null,
                    "fileName": "sections/cart-icon-bubble-mobile.html",
                    "isPrivate": null,
                    "checksum": "af69705279be8f60387dc6af067d1e5c57958ab22cc423f228f8edb76b68d24e",
                    "fileContentChecksum": "52a3e3e6fc04ad3fd6513f29721e0c14f046e992af504a9c18c3fbee09e68b17"
                },
                {
                    "id": null,
                    "fileName": "assets/component-select.js",
                    "isPrivate": null,
                    "checksum": "14e2396991deaa17e38fceefe4720f8a35fa1993f160d60be1a5dbe078c89db1",
                    "fileContentChecksum": "ee00ef09da600fec856d1d0b1625375041637cc4849ac9358ae24c9a1c0b2327"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-sell-truck.html",
                    "isPrivate": null,
                    "checksum": "b108b761fc0ad64ff24adc3a4ec6dcb0cf4537000724766768e3976f242fe46a",
                    "fileContentChecksum": "91b0524bb7d85b401b470abf563a20eb7d205afd8cc6d573efc4184551f5363a"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-official-pin.html",
                    "isPrivate": null,
                    "checksum": "2576d2486ab25cd8899b9eca551b68765fea8c86feeacab9a88851d2c0b452da",
                    "fileContentChecksum": "3ba161d372386973e14aa5f6d9e8ed358d43f999a557411a3d3a0d0221fd7d8f"
                },
                {
                    "id": null,
                    "fileName": "assets/component-slide-pagination.js",
                    "isPrivate": null,
                    "checksum": "063e617acb4270c2bededa149cef4264ed684db2cf72f738fba24ad3031263d4",
                    "fileContentChecksum": "7dcbfd776e37bfb67c05ba7ab34a531a05b1bf2e9862c5601a8fc8166d4d2545"
                },
                {
                    "id": null,
                    "fileName": "templates/page.order_tracking.json",
                    "isPrivate": null,
                    "checksum": "4ea4d4ffff828cfa932bf96442feaf9a471bb614f9919e0585dbaa53e38afd08",
                    "fileContentChecksum": "8f618a8346a29cf67e4e257cbabbe64b337ccd3c151801720b670c1e7fb5a893"
                },
                {
                    "id": null,
                    "fileName": "locales/nl.json",
                    "isPrivate": null,
                    "checksum": "a75ceb7dc36d04aad919f60ac0330e800a3f21c989128aaf9fbfbde51eb75e2a",
                    "fileContentChecksum": "b68dac74640421bfa951dd692298c1372823dd2ab13c3516a81072fc8718a4bb"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-product.css",
                    "isPrivate": null,
                    "checksum": "209d1ba0af957df2cb32127d3e8622217e93568fc61b1ad735c295a94c5c722d",
                    "fileContentChecksum": "136db7190ec44af7ae9f901e8c25bc7c669c3c2fc38e70b2c4b8af94aa33c8e2"
                },
                {
                    "id": null,
                    "fileName": "assets/component-color-swatches.css",
                    "isPrivate": null,
                    "checksum": "862d69a9f50fe222e2caa086cf2c134a74819dc1a8181a4515f4b3a59958769b",
                    "fileContentChecksum": "af186f086c551f242274642b2306e3e31292c1efdd3dd80dd6b2f65b6cf1c934"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-minus-hollow.html",
                    "isPrivate": null,
                    "checksum": "3a0c3c8c81f3580d3b87529aa41390e06f7811849e99a4565f15b0805e3f9b4f",
                    "fileContentChecksum": "2c61259dc6727631f0a98c453914653f04ac96434684f75c1eb1685d121d62d6"
                },
                {
                    "id": null,
                    "fileName": "assets/section-announcement-bar-sticky-top.js",
                    "isPrivate": null,
                    "checksum": "85f6d238b27db160655b4d6dc7717c3b7eacd6d4dcb6d6e538c228ae2854db4a",
                    "fileContentChecksum": "9b13ddb16f48b4f449dbf69d82629247022de5faa87f282e89dbfcad05b1735d"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-article-tag.html",
                    "isPrivate": null,
                    "checksum": "3c9a98cf132c7ff44bf518ed6bb9e81ea8648f4809bd23e02ca2fe59f57f574b",
                    "fileContentChecksum": "cd80312b99ac3d6a4e6c3da260757140aeafc102e2e6ff6cc5e2cfa901feb212"
                },
                {
                    "id": null,
                    "fileName": "locales/hu.json",
                    "isPrivate": null,
                    "checksum": "b136c8014b51bde8f07a049fd43ee93bfb120f2b71f3a69d2a0040a7ae1a4615",
                    "fileContentChecksum": "447c61e582cccc36fc7cfc8579d935a96ac8e66d1ae12a00305035ff9783cd74"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-password-header.css",
                    "isPrivate": null,
                    "checksum": "eee4d1738c0583cd380b647e33d46b9380197c302ef06eeb94e27b41969d01fc",
                    "fileContentChecksum": "c6f084a24ee47b9b8be0ff1597a21020088b1a30e43d3814017dba198d79b6e4"
                },
                {
                    "id": null,
                    "fileName": "assets/price-per-item.js",
                    "isPrivate": null,
                    "checksum": "a3f750dc42292e506ecbe2fefa0e46fd782165628fee44e31f41d382c6ab0fc0",
                    "fileContentChecksum": "124ecfeb41fd14e9c7e264e89acd889645e3f4b109ef84dbcdd13b05770339d8"
                },
                {
                    "id": null,
                    "fileName": "assets/section-customer-card-container.css",
                    "isPrivate": null,
                    "checksum": "2080867f85ee9618b93109304ee1e7a17dbd89e9394c940787912b9705f33d02",
                    "fileContentChecksum": "c4aeca88ec56d712c471940b08d1bdb87d27e347c26a64ef093a4de999eb26e7"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-package.html",
                    "isPrivate": null,
                    "checksum": "f376f46b20a7cfcf0d002e80ee8343e941dfb99ad5d05f195f857ab905d35f3b",
                    "fileContentChecksum": "675acc70819d7a53f97b62a9330f20db0d2d49372e29fefbb42c79b4fe8997e7"
                },
                {
                    "id": null,
                    "fileName": "assets/component-product-modal.css",
                    "isPrivate": null,
                    "checksum": "7511838930b8de7c9c3231b1f26156b196454acfe680ba8287d87b2ba9bcc0ea",
                    "fileContentChecksum": "f5c7460a18750184197c428c4bbb3d25a60dd5ea8304bf5f14b7fe4974530b19"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-arrow.html",
                    "isPrivate": null,
                    "checksum": "239246607269883d91654e643e1b43c53a89fc8d7d68192b8cb99d3ecf6d5e73",
                    "fileContentChecksum": "648d33e659e7e07cb3996c4bee7e9e0ba1678e2682844d9bc4eca77a0b190692"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-social-linkedin.html",
                    "isPrivate": null,
                    "checksum": "3623ce5e2ba27c505391782ff24812bb17016f780992161fba3506a22f90a927",
                    "fileContentChecksum": "af097802fe0b5c28689a9eeac1d5d1b9472363366d1dbcb034957bd3a2a16454"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-select.html",
                    "isPrivate": null,
                    "checksum": "ad20513c6db3974c952a2bf0de21dc4c703049e5a6468263fcb1ca0a3393e17f",
                    "fileContentChecksum": "8060febab51aab1e311ee29fe5de9e41abb7a646f0aefff6f8e0fe5078e6bb02"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-toolbar-social-pin.html",
                    "isPrivate": null,
                    "checksum": "4b45b97233e86ea330cc4eb0f298be52b3d36f08413a23449f52deef15589b82",
                    "fileContentChecksum": "7d376523c466dcf5dd771e13a7ed556163e56b60ae3340f330807fe0fd070bac"
                },
                {
                    "id": null,
                    "fileName": "templates/index.json",
                    "isPrivate": null,
                    "checksum": "f10a468da1d2d53b43755b64b2d192c9a74b6a46d09de66c52fb692ce04e85e4",
                    "fileContentChecksum": "6ee2951b3b575d1a26a84fcd63da04f5714ef40cbbf7735a583caa86f3e8dcf5"
                },
                {
                    "id": null,
                    "fileName": "templates/customers/addresses.json",
                    "isPrivate": null,
                    "checksum": "f43c13f1fd5310f246b2595460a9b210846ca950f904ec14b877bad037685375",
                    "fileContentChecksum": "6344f57a91213156c765cb046504d3542f27187937bec0641872f4f360fc8493"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-sort.html",
                    "isPrivate": null,
                    "checksum": "b4c689b7fd3b2c875b114a64d0f412a9ededefb718f5d84967f3b840f374ee0d",
                    "fileContentChecksum": "668c3c51973dc9ad89a13ab65083764dfe72480aa7937a3aa2698fec3162abc8"
                },
                {
                    "id": null,
                    "fileName": "assets/component-product-breadcrumb.js",
                    "isPrivate": null,
                    "checksum": "8d4754409f7852e4119d4547e8df916d6566e64d45416d118ec20c55ee9e45dd",
                    "fileContentChecksum": "2d2dcc9c116a9a1bc9ae1bcc4f27d32d90d52d6fe0942f7825f582c04d671e0b"
                },
                {
                    "id": null,
                    "fileName": "sections/picture-floating.html",
                    "isPrivate": null,
                    "checksum": "33407982dfd32bc099522258dd0785942a66ebb6729b3c7545ebbc2fc765d54b",
                    "fileContentChecksum": "6c8a6e93189d014bc612c5368c7d1496d48e36c0a526562a7c85c2e89e3bc2c8"
                },
                {
                    "id": null,
                    "fileName": "assets/section-featured-recommend-products.js",
                    "isPrivate": null,
                    "checksum": "d6d0ce67d9a75fa409bbdab292e7369a064b7a9ae6238dc78081515fac2233fb",
                    "fileContentChecksum": "1a3f8de58e496fb6644ea1d4d7e630b471fe65083c0491111bf1e1499cddf164"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-toolbar-social-line.html",
                    "isPrivate": null,
                    "checksum": "e9864ee4108683033f154e5429b3a157035982d06840e47e743f76bb4b09652c",
                    "fileContentChecksum": "eb0fe9f99308b2530342bf33a7ffb9a381be0d6db054d3045bb88fbe1ae61ce9"
                },
                {
                    "id": null,
                    "fileName": "assets/section-customer-lib-jquery.js",
                    "isPrivate": null,
                    "checksum": "75426cc7787b0be9d2bfc57796c5e2f6f093c8fd517951490721f0f79c95d316",
                    "fileContentChecksum": "7b1f54aca96dbaa0c57b99ff98dede0049fb63890635f3c9714b171b3ca9188e"
                },
                {
                    "id": null,
                    "fileName": "assets/component-show-more.js",
                    "isPrivate": null,
                    "checksum": "f43472ee9039d944c1d4a1c33e4ade9362b87bc296e166214b7c8ac1199362cf",
                    "fileContentChecksum": "9c3b156c72681d18d11adf09e19caf90dcac60e71047bc6e3d3bafbc7b411c18"
                },
                {
                    "id": null,
                    "fileName": "assets/section-image-with-text.css",
                    "isPrivate": null,
                    "checksum": "c02124618e7e5467f27d47c7c594af4c1ef44e7c971671a6272205fccbd4b696",
                    "fileContentChecksum": "e8a7b2b5f25257f54057c984d6890711b903186397da5e6ad8f74425dfbdb9e7"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-safe-pay.html",
                    "isPrivate": null,
                    "checksum": "04c283b0251de45768169493bc0e4edb7a39e06beb16c519237c6d9e45e151d4",
                    "fileContentChecksum": "deb4335bac3a2a9cb53d42bf1f92b8a1e66c0171c16abe0aa01ca5785cbb924f"
                },
                {
                    "id": null,
                    "fileName": "assets/snippet-cart-empty-recommend-product.css",
                    "isPrivate": null,
                    "checksum": "701747ed64d3bdc793a6b7a3dbcfd93c6591bcc6b43e60f7e4fbeb5c4bb57bdc",
                    "fileContentChecksum": "41851224354fb10da4eb6824899baa730dc93609fddf57185ecac2faef3970a1"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-social-tumblr.html",
                    "isPrivate": null,
                    "checksum": "ce6d55000e741402edd5cd91e3a120aa5dcb5bb219b6e75d301d156517b61071",
                    "fileContentChecksum": "0f801e268ea6f5f1af8fbdb8bb0e05376757fe8e1dc6072545e6565962d333a0"
                },
                {
                    "id": null,
                    "fileName": "assets/lib-photoswipe.umd.min.js",
                    "isPrivate": null,
                    "checksum": "94e1a422f25fa7359e3096a5f8e655e2e946f880a3f15202323849d557fd583b",
                    "fileContentChecksum": "74dd4e2450df8dcb76faa45d5c1aa050c7966b96a8af8893bc46c759b1470b00"
                },
                {
                    "id": null,
                    "fileName": "snippets/product-thumbnail.html",
                    "isPrivate": null,
                    "checksum": "645f9796843eaf6fc2764fcb299c03b62551bb56319ac22bc356af9d7a06fe63",
                    "fileContentChecksum": "25d410e361ea00073eb5791ac427f591616f834a3d6e6d7b23877e566be69bcb"
                },
                {
                    "id": null,
                    "fileName": "assets/component-infinite-scroll.js",
                    "isPrivate": null,
                    "checksum": "20ba78baf3e861708fbf20cb7ddef0ade6c2b588b0e8e28f94eff29ecb9f670a",
                    "fileContentChecksum": "8afbe22d95b829da93dd00fe32ef736df755961153bc1fad76908f3d6d0c0043"
                },
                {
                    "id": null,
                    "fileName": "assets/component-cart-notification.css",
                    "isPrivate": null,
                    "checksum": "bab3af48eb80859858c8e1bb6adeda7a37307521a589562a622628938fc17d9b",
                    "fileContentChecksum": "930e207171a77974c65ecc60f6371ee9c19484cf8efb9269cd1296c1f519f1ac"
                },
                {
                    "id": null,
                    "fileName": "sections/multilevel-filter.html",
                    "isPrivate": null,
                    "checksum": "18fe6acf5796639064b9dc8a73d2515570f796c8ab2db567e10ed001ba59b7bb",
                    "fileContentChecksum": "aa4fb696a929820e89e3a50c25eb3b2c8b079c4433ee385d5eab099ba6be8ef2"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-search.css",
                    "isPrivate": null,
                    "checksum": "f8c921a88a19c06e56566572c6eb54bfc56f883d61b0a3a23a2871f181caa51d",
                    "fileContentChecksum": "d663d1577fca05fde5b96ad5bdc03ac4f8e7a358cad49c61ab76a9d5cb2d5efa"
                },
                {
                    "id": null,
                    "fileName": "assets/component-company-form.js",
                    "isPrivate": null,
                    "checksum": "11b77bf826b138ecd1cbb2bd67ebf2c3d197adf5a7ee6f19bede016f2f0f22a5",
                    "fileContentChecksum": "7e2cf5170ef2f97a53288e41ccb2d3d3460950944372841cfb2c6ada74d8fc83"
                },
                {
                    "id": null,
                    "fileName": "assets/section-customer-datepicker.css",
                    "isPrivate": null,
                    "checksum": "076992fa605fe007289fb1e497b3152f7c522bf1a372b06e04985270c583a8e0",
                    "fileContentChecksum": "2c520fa1f96c6ac7c3c953ba376515294d5f27fd570eb1551f9bcfa33ae6df1b"
                },
                {
                    "id": null,
                    "fileName": "snippets/account-subscription.html",
                    "isPrivate": null,
                    "checksum": "db14a03344f860ffbd46ff04b56c7bd1cfdc167686e87a881a52f8296f51d0ae",
                    "fileContentChecksum": "a8b178d0970708f7c3754cdb282a374a8879ca31a3c1991fdc87e7fa18e9866e"
                },
                {
                    "id": null,
                    "fileName": "assets/cyclic-scroll.js",
                    "isPrivate": null,
                    "checksum": "223a92ac6c5333755328b4820020c848aecd0c70420b73f5668a8468fd999dbb",
                    "fileContentChecksum": "e4cca2b01ee87c551cc7a6e616b82f5cb8be1e6e3803360dc3e76618cac1e722"
                },
                {
                    "id": null,
                    "fileName": "snippets/suggested-menu.html",
                    "isPrivate": null,
                    "checksum": "1d6329b21793b816f6c122ca02c8d59a83d814391432ef63af9e9ab640026d30",
                    "fileContentChecksum": "7069485e22410878d6bff1f8f60bfafd23f9a8fd6bb63a23ab21d7fa605463fa"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-toolbar-social-vimeo.html",
                    "isPrivate": null,
                    "checksum": "737f787abc9102248bb3fc428208a9ad4f96383470bf1544a85dfe43ffed6631",
                    "fileContentChecksum": "1074a7e4f18673685171c1dca93da8cbba8bc3c529447fcb24b276877ad8e62d"
                },
                {
                    "id": null,
                    "fileName": "assets/component-quantity-input.js",
                    "isPrivate": null,
                    "checksum": "85116091fdac2cd0664d815c44c9cdccdea26c53b8486a0f1101fce598f9a48b",
                    "fileContentChecksum": "c6c3dddb731dd4c77d10be5ac05f06d74d6f1358004e7b2c6b9bc258db9ea467"
                },
                {
                    "id": null,
                    "fileName": "snippets/title-tag.html",
                    "isPrivate": null,
                    "checksum": "5bceb3803c23ff425fecfafc017a4538ebfa14a0e8aec8617008695e4a1a9d3b",
                    "fileContentChecksum": "e57c518a69e4894400b784596d60c943e214442ba66ee01fd09553735bba5cb8"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-login.js",
                    "isPrivate": null,
                    "checksum": "431fb5c23b31260506690adf231ce990eab6ab37d8adf0c6b8e1491dc839279d",
                    "fileContentChecksum": "f342f0174bea1e347482ba47b34626236aa7d349e1685a3cc5749db96b9a1a27"
                },
                {
                    "id": null,
                    "fileName": "sections/main-activate-account.html",
                    "isPrivate": null,
                    "checksum": "d47f77768305c4cf0b3c7f05bc83d7aa31dc51f0296ce4ad098e61e73da2b8d8",
                    "fileContentChecksum": "d88662b9b2550fe365f4271b90012bd8f97517ba873360aeef6e759fba3eb8aa"
                },
                {
                    "id": null,
                    "fileName": "assets/component-blog.css",
                    "isPrivate": null,
                    "checksum": "cbb9de8b5c14fe96d3d09a395fb506a81976ce956a2eed9daa0a1ae1b23cf7fe",
                    "fileContentChecksum": "72ec1ebf2dbe1e67bfd877adc3ed364e226d0454a3efb7872356fca4c21fc91d"
                },
                {
                    "id": null,
                    "fileName": "snippets/product-media-modal.html",
                    "isPrivate": null,
                    "checksum": "11949afa2554c4170d11a4979ffa4ba8ca1ebc73d1ecdb1c87df5cc4de8bbe71",
                    "fileContentChecksum": "12bd176f0e3de3c1d0ffad2a4bf2497a37200c86b9005f0a80b098844da7798e"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-account-facebook.html",
                    "isPrivate": null,
                    "checksum": "2eaff959041ac61838b38690eeada4cba764420ee1d441518428b9922ec95eae",
                    "fileContentChecksum": "6d9d347be63bd0486d9b4d4aeb4c97d1033c23cc73b1175c7e7f67894e345fb2"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-customer.html",
                    "isPrivate": null,
                    "checksum": "99981a0744ab2f8866b6e2d61c1d9633eb8e866376d244bb4fe9acdd8d1fea67",
                    "fileContentChecksum": "47502ea409a78db00c70b74f6950f3eedfd993da282fc8f89e66d49b6923ddba"
                },
                {
                    "id": null,
                    "fileName": "assets/component-quick-add.css",
                    "isPrivate": null,
                    "checksum": "6ec0264b46331e19ee54e37f416f24e537ef390ea8ec9f6c9029f35159a54204",
                    "fileContentChecksum": "1af6613fe7762203d5bde5eea9af0a5a736b125443cd4bab4546db485caa8042"
                },
                {
                    "id": null,
                    "fileName": "assets/component-localization-form.js",
                    "isPrivate": null,
                    "checksum": "249965b7562daca09cf8bbe59fdfc084f45a666fd9dd589280e96cd012e0ac87",
                    "fileContentChecksum": "4e12707f4f75ab4d3dec2eb79df4029142a6411c2ca95f342b02502d11d58f0c"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-toolbar-social-snapchat.html",
                    "isPrivate": null,
                    "checksum": "e3c582cb135e127624736fbb44b3a259efb477299b62dc2bdd206f09109de65e",
                    "fileContentChecksum": "0913f34a949d9a856dd28203431b0e02e19d415b49c356073bcfb2a7731914ee"
                },
                {
                    "id": null,
                    "fileName": "sections/main-collection-banner.html",
                    "isPrivate": null,
                    "checksum": "d3ad202a6e9a405fe0c0ad9f43f1c28d2a49d5f9824938b78ba380cc4a3ded1b",
                    "fileContentChecksum": "6f48ad44f8b2deee7a77f5962973387dbeb9d8250cd668fcd140b094d9ba5f43"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-chat.html",
                    "isPrivate": null,
                    "checksum": "bc5e00914e1ed2a57c8bb41ef33dd099dfe8030afc28506914a797174ec200f7",
                    "fileContentChecksum": "9aca17dda14d9272be2b0d7f398b30b5786a542b2c978f151136b9f03deab942"
                },
                {
                    "id": null,
                    "fileName": "assets/image-instagram.png",
                    "isPrivate": null,
                    "checksum": "39ec5ff5c199a91f28daad427ec4b1ada4ad1b672f35775af3cb8e716779d4e2",
                    "fileContentChecksum": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-account-tiktok.html",
                    "isPrivate": null,
                    "checksum": "849b6e0637c2b1703ce2bff2a294ce820f340b90e2d7e7486c2ac88da0a76612",
                    "fileContentChecksum": "76c0a9c7c43ef206b2df0b259bc406b939fe375bb8b36349877e6385072f0285"
                },
                {
                    "id": null,
                    "fileName": "assets/section-user-center-message.css",
                    "isPrivate": null,
                    "checksum": "999b7d7740c965a550cd5f1ba50078ec6345e201b8ab3ba4c185dd1cca56d0d7",
                    "fileContentChecksum": "3949ace86a7aa7f6c8059e4ae08cbe79887a3cd1864f68ada303afc45c4058bd"
                },
                {
                    "id": null,
                    "fileName": "sections/cart-icon-bubble.html",
                    "isPrivate": null,
                    "checksum": "4177ee0683186aba825a523f0af7b4682ac9bca57080be710cbe4adf2f00f602",
                    "fileContentChecksum": "e5bdf2c274972787a90b50210f1d8a3dd2120134fd6e7edfb11af021d3a939c3"
                },
                {
                    "id": null,
                    "fileName": "locales/ms.schema.json",
                    "isPrivate": null,
                    "checksum": "40a14da22466cb041b1071c7a1500f30d3e78f9589b2762a60e83c8ce33d25b2",
                    "fileContentChecksum": "e75b4381e75e1b2ce0606c2e208f3cbba88366a54c7247ba25cf4e6ed30d2ffc"
                },
                {
                    "id": null,
                    "fileName": "sections/text-with-image.html",
                    "isPrivate": null,
                    "checksum": "562efcd656371ca294026a9f47d060509fbe3463437b98ed2cf6ffc91c4e0f95",
                    "fileContentChecksum": "d9cfb10f02232c7520d81d155797bfe1159ae2649e2b2a88a55aa6952ecb1427"
                },
                {
                    "id": null,
                    "fileName": "assets/component-cart-notification.js",
                    "isPrivate": null,
                    "checksum": "ee783881bdaa15c7879eed28fdaa273ef9be2594e9bef6956bcbb2242d77e421",
                    "fileContentChecksum": "946b50be24e3a4eb35067cce63b475a158a2d3a7dec8710dd2ddf8352740257e"
                },
                {
                    "id": null,
                    "fileName": "snippets/text-columns-with-image-card.html",
                    "isPrivate": null,
                    "checksum": "bfd8f2b49fe3c501859015356d0330e082beb335ab76c7e630195381f59a33a7",
                    "fileContentChecksum": "be958a0a5f5b0fecacf7da4827f0198e61776f4ad755438d5b74b3c8d7e4a2ae"
                },
                {
                    "id": null,
                    "fileName": "assets/component-dropdown-menu.css",
                    "isPrivate": null,
                    "checksum": "fb34cbcc35e76184eb1116a1cd653ac4f54b4749fb5fae5289f5796c40fed5ad",
                    "fileContentChecksum": "382c806e1a5e4c71485db29f0ba58aaa5f88761906f72a424cd279ef6dee01c3"
                },
                {
                    "id": null,
                    "fileName": "snippets/footer-logo-list.html",
                    "isPrivate": null,
                    "checksum": "fe7f30f010bb8f5cc14edf2e43c1b163ee6d4124665b29f33bb2fc99ea71f2c1",
                    "fileContentChecksum": "6b6fae7cd563bc22abb29e41483cf6976e9a4b09498f0d1acf1fc47b9709cbfb"
                },
                {
                    "id": null,
                    "fileName": "snippets/product-media.html",
                    "isPrivate": null,
                    "checksum": "378e5cde7636b05347706a709703714cb65b12826110a14e553e8918e8b9dee6",
                    "fileContentChecksum": "bc26b670b3b57f150a2da5cfb76d41b7bc1a79cd8639bf9d7f360868f7b02592"
                },
                {
                    "id": null,
                    "fileName": "snippets/cart-drawer.html",
                    "isPrivate": null,
                    "checksum": "8b96bead39a16ae937e2778e1d75b7e6568aee6ac77be54d32c3cc8835da32eb",
                    "fileContentChecksum": "140a3c4bf62a89ed5c18128a3490e451796fc24e500c6de734fca7ada5451aa6"
                },
                {
                    "id": null,
                    "fileName": "snippets/tips-card.html",
                    "isPrivate": null,
                    "checksum": "250d54addeb1eb6c7af96087df90a4661b226fd29e541b3028d67ebdd9760368",
                    "fileContentChecksum": "88457b54a5be3149677855b9b1efc3012b2337ce9539ff44ae8a52e69146e237"
                },
                {
                    "id": null,
                    "fileName": "sections/apps.html",
                    "isPrivate": null,
                    "checksum": "e9fb9c3bbbb4abae1205f6bf41d703bdc2d0a1905c8382ef4b8ac0d78100cd04",
                    "fileContentChecksum": "ce584209c5373d3ff421d88b273fb318257bc82f5bc42b40663f7558dd4d428e"
                },
                {
                    "id": null,
                    "fileName": "assets/section-featured-collection.js",
                    "isPrivate": null,
                    "checksum": "b36b45a8e963457a8ee9c7322afe74bc133a295ee749de5648a892f814984709",
                    "fileContentChecksum": "99bb0728be0c5369b31e921417df4219631240d47864a8fcbae0b6acfdad90a9"
                },
                {
                    "id": null,
                    "fileName": "templates/404.json",
                    "isPrivate": null,
                    "checksum": "8d53680429de13df82291594b70953aeb1f2c65d3ea01a3be2310c9a237d9c1a",
                    "fileContentChecksum": "16fa73d997867377e2dc0fba53ded438d255caad673fdec0ed01858540564fae"
                },
                {
                    "id": null,
                    "fileName": "sections/main-order-detail.html",
                    "isPrivate": null,
                    "checksum": "18008b3a59b79ab47ae20021d0812c8f78137a31e007ba03b58b1bbe0bdee4f9",
                    "fileContentChecksum": "2c8e860ac7e6a278bde12bcb2bda359b436d5f5f4b4199916ee19b02d5327f9d"
                },
                {
                    "id": null,
                    "fileName": "locales/pl.json",
                    "isPrivate": null,
                    "checksum": "6ab26252fa73930b7fb63ef0b7bffb05885a783db8d12f6fd9b8379b2de390ff",
                    "fileContentChecksum": "5ec977b0aebf6990f7690bbfe320e817b7ebdbf39c1de3fb2ccd75d70a019c50"
                },
                {
                    "id": null,
                    "fileName": "assets/component-predictive-search.js",
                    "isPrivate": null,
                    "checksum": "9fe875719d7e988ae0f890c5a1412479c1520481ab6d45e2f649709d773c6df8",
                    "fileContentChecksum": "832fef9c3604019eeca3fc56a47fe7bdaf8c1ec78cd05de3b570a1de32de2a85"
                },
                {
                    "id": null,
                    "fileName": "sections/main-cart-items.html",
                    "isPrivate": null,
                    "checksum": "2f092e05b61798f1abc7506464560b705339e32dad82f43a4bbd4dcf0f0344e2",
                    "fileContentChecksum": "59d6881b2801734441b5a49757db3fc7b33dff80df53942a27b43250cdcf5c99"
                },
                {
                    "id": null,
                    "fileName": "assets/component-cart.css",
                    "isPrivate": null,
                    "checksum": "bb9c677d7c51f549146573ae73e99d1daf7a4260cfe923c873379caf7e519768",
                    "fileContentChecksum": "2c1fae3cb720bc62bb334b7af85c3f8a4a61b5077e5e2100ba62fd2c441ac94f"
                },
                {
                    "id": null,
                    "fileName": "assets/section-video.css",
                    "isPrivate": null,
                    "checksum": "c4456ef75ac337227531168d2d6e75c11b84aab34291d6cae08645b28b4f0ac8",
                    "fileContentChecksum": "c2f94eca53752fb162cc8c668f18a0615c442595eff713216965fcb9e96671dd"
                },
                {
                    "id": null,
                    "fileName": "assets/section-count-down.css",
                    "isPrivate": null,
                    "checksum": "2584981a391b8c58548655a96457e930f4409b07ce1cb8f668c826c6b7c0e9b3",
                    "fileContentChecksum": "153701b2ad93b9b94617c7f37a015a093ae46d6113a4830f49ead00f0704fb99"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-official-ig.html",
                    "isPrivate": null,
                    "checksum": "4beaff822010df3ec6dbdd43ddd2e25154dd07d4a96899003da4a187fc670186",
                    "fileContentChecksum": "1acb56aad92701e127a6bb05b21639fc09ecb37b6ceb21b1a12c9e2835110f08"
                },
                {
                    "id": null,
                    "fileName": "sections/spacing.html",
                    "isPrivate": null,
                    "checksum": "ad5ccb34a6cc4fc0cbc7f94e85baff2229d13183d07fe2d02d0884c36500f354",
                    "fileContentChecksum": "84bf5e70b458adadefe4789e45788ae9b7dcad0a92ff6bbebda51aa1467e196c"
                },
                {
                    "id": null,
                    "fileName": "assets/component-pagination.css",
                    "isPrivate": null,
                    "checksum": "2506532bc9eb55c29faad9c58653ab11b453d79df89eae9575b667872310db55",
                    "fileContentChecksum": "9587dcaa5417691d76e55d70463bd5a63e4676232040f31036ae337d0d49a2e3"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-discount.html",
                    "isPrivate": null,
                    "checksum": "cce45f78e96c36ba045051ef05068529958cc246c52fb8b358ec2ebfc891582d",
                    "fileContentChecksum": "8decbbb44d1474c89a885650c16d0fbe7579f687b5ee585fefaeb29c7e31235c"
                },
                {
                    "id": null,
                    "fileName": "sections/blog.html",
                    "isPrivate": null,
                    "checksum": "f57a37a847c04a66ee8f3a9f159562864aaff3d5f6db9618bd11368521966adb",
                    "fileContentChecksum": "4b4bd910d82d42265426612b1736f3ab5ae87e2be1b5728ad2cc37e128853daa"
                },
                {
                    "id": null,
                    "fileName": "sections/rich-text.html",
                    "isPrivate": null,
                    "checksum": "5d66f9f05c37ee9c7d6f1ff116cb01ec8e04ed8731c63f778b2e01f8cdfeaf70",
                    "fileContentChecksum": "11e2b61c7863378c6ed8cf80625cbcc5d0795f61f43fe6888e7b968f9ea897e1"
                },
                {
                    "id": null,
                    "fileName": "assets/product-info.js",
                    "isPrivate": null,
                    "checksum": "d846c54a076000959e75d71dc07bc2084ba05a80b74718ec21e0b1629af26809",
                    "fileContentChecksum": "fae9ad558d41cd48519bcd723e1c7089eb088a7a0bcbf64b4defea840a9f6a46"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-conact-tel.html",
                    "isPrivate": null,
                    "checksum": "9e82e97afcafc2280c2c8c6c82a08862e86cf96de70eb45f6e62b89eea162da3",
                    "fileContentChecksum": "ad1ae73b42b725f40fd564a1d0b371fd6b5596be384aade258f1f877f6827cd6"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-official-fb.html",
                    "isPrivate": null,
                    "checksum": "9608d0b65d852ca5fd9417b5185c3f4aaa1fa20ada6df4bbbd99ddc5b131f705",
                    "fileContentChecksum": "bbccc33d5d760e654f406174a8613a0396700fab7f128059149f52735c49a825"
                },
                {
                    "id": null,
                    "fileName": "snippets/slider-button.html",
                    "isPrivate": null,
                    "checksum": "fe7c4ffad22e57cb1510209c759dc83f7c2c68f848f3c444fb6fd06c75258771",
                    "fileContentChecksum": "9f4b8e054eacd3a49a4eaf81799c0c2cd4d08990a93002c65b517f4ab9fead6d"
                },
                {
                    "id": null,
                    "fileName": "assets/image-store-close.png",
                    "isPrivate": null,
                    "checksum": "68920ab4c3594239f6875a761fbaaf73b7604baba951ac47ab0cfa6a889e3f73",
                    "fileContentChecksum": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-official-twitter.html",
                    "isPrivate": null,
                    "checksum": "e799fb8631d60523f4c3aaeaaf48423ac409e5dc0bdeef2043c6b1d4c751c8c5",
                    "fileContentChecksum": "14328be0b0ebaa7463dcb95d5c739d81153d0c0280769d53bc9b2c16ef6b3491"
                },
                {
                    "id": null,
                    "fileName": "snippets/icon-conact-address.html",
                    "isPrivate": null,
                    "checksum": "db6aa2e6fbd6af350de25f578e6b0c1153b223bf08cadf358f46d217be95d5cd",
                    "fileContentChecksum": "f812ef6939ddc9c26cec3efc2ca10d889ffe88db45adda9a9423bb183ff0a71d"
                },
                {
                    "id": null,
                    "fileName": "assets/section-main-activate-account.js",
                    "isPrivate": null,
                    "checksum": "99d9dfb2659d8cf547aa210ce1d0e1eb9a1876f81bf88850aa53e7fbaace2f0a",
                    "fileContentChecksum": "e1a5cdaf505742a4ae1c9ec86063db099e81a459c7574197f646ff743d6f795f"
                }
            ]
        })
    },
    'POST  /api/ApiTemplate/file_detail':(req: Request, res: Response) => {
        res.json({
            "code": "SUCCESS",
            "msg": "ok",
            "success": true,
            "data": {
                "id": "68984f3588aa4e4edbe11f9a",
                "themeId": "689566e7c33664582b084913",
                "fileName": "layout/gift_card.html",
                "fileType": "text/html",
                "size": 1053,
                "fileContent": "<!DOCTYPE html>\n<html lang=\"{{request.locale.iso_code}}\">\n\n  <head>\n    <meta charset=\"UTF-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n    <meta\n      name=\"viewport\"\n      content=\"width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no\"\n    />\n    <link rel=\"canonical\" href=\"{{canonical_url}}\" />\n    <meta http-equiv=\"x-dns-prefetch-control\" content=\"on\" />\n    <link rel=\"dns-prefetch\" href=\"https://fonts.gstatic.com\" />\n    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" />\n\n    {{#if settings.favicon_image}}\n      <link rel=\"icon\" type=\"image/png\" href=\"{{settings.favicon_image}}\" />\n    {{/if}}\n123\n    <title>{{t \"products.giftcard.seoTitle\" value=(money_with_currency gift_card.balance) shop=shop.name}}</title>\n\n\n    <meta name=\"description\" content=\"{{t 'products.giftcard.title'}}\" />\n\n    {{content_for_header}}\n  </head>\n\n  <body data-button-hover-animation=\"{{settings.btn_hover_animation}}\">\n    {{content_for_layout}}\n\n    {{content_for_footer}}\n  </body>\n</html>",
                "fileNames": [],
                "createTime": 1754812213671,
                "updateTime": 1754913904217,
                "isPrivate": true
            }
        })
    },

    'POST /api/ApiTemplate/instance_list':(req: Request, res: Response) => {
        res.json({
            "code": 0,
            "msg": "success",
            "data": []
        })
    },

    'POST /api/ApiTemplate/templatemall_list':(req: Request, res: Response) => {
        res.json({
            "code": 0,
            "msg": "success",
            "data":[]
        })
    },
    'POST /api/ApiTemplate/instance_using':(req: Request, res: Response) => {
        res.json({
            "code": 0,
            "msg": "success",
            "data":{
                id:"123456",
                template_id:"123456789",
                template_name:"test template",
                template_version:"2.1",
                os_version:"2.1",
                status:"1",
                update_time:"1759802280",
                create_time:"1759802280",
                languages_id:"2",
            }
        })
    },

    'POST /api/ApiEditor/installed_sections':(req: Request, res: Response) => {
        res.json({
            code: "SUCCESS",
            msg: "success",
            data:{
                sections:[
                    {
                        "type": "SECTION",
                        "id": "announcement-bar",
                        "config": {
                            "sectionId": "announcement-bar",
                            "type": "announcement-bar",
                            "disabled": false,
                            "settingsData": {
                                "disabled": false,
                                "type": "announcement-bar",
                                "settings": {
                                    "show_notice": {
                                        "value": true
                                    },
                                    "notice_link_text": {
                                        "value": "30-day postage paid returns"
                                    }
                                },
                                "blocks": {}
                            },
                            "schema": {
                                "name": "t:sections.announcement-bar.name",
                                "max_blocks": 12,
                                "settings": [
                                    {
                                        "id": "display_mode",
                                        "type": "select",
                                        "label": "t:sections.announcement-bar.settings.display_mode.label",
                                        "default": "4",
                                        "options": [
                                            {
                                                "value": "1",
                                                "label": "t:sections.announcement-bar.settings.display_mode.options__0.label"
                                            },
                                            {
                                                "value": "2",
                                                "label": "t:sections.announcement-bar.settings.display_mode.options__1.label"
                                            },
                                            {
                                                "value": "3",
                                                "label": "t:sections.announcement-bar.settings.display_mode.options__2.label"
                                            },
                                            {
                                                "value": "4",
                                                "label": "t:sections.announcement-bar.settings.display_mode.options__3.label"
                                            },
                                            {
                                                "value": "5",
                                                "label": "t:sections.announcement-bar.settings.display_mode.options__4.label"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "pc_scroll_interval",
                                        "type": "range",
                                        "label": "t:sections.announcement-bar.settings.pc_scroll_interval.label",
                                        "default": 12,
                                        "unit": "s",
                                        "min": 5,
                                        "max": 20,
                                        "step": 1,
                                        "info": "t:sections.announcement-bar.settings.pc_scroll_interval.info"
                                    },
                                    {
                                        "id": "mb_scroll_interval",
                                        "type": "range",
                                        "label": "t:sections.announcement-bar.settings.mb_scroll_interval.label",
                                        "default": 5,
                                        "unit": "s",
                                        "min": 3,
                                        "max": 20,
                                        "step": 1
                                    },
                                    {
                                        "type": "switch",
                                        "id": "show_social_media",
                                        "label": "t:sections.announcement-bar.settings.show_social_media.label",
                                        "default": false,
                                        "info": "t:sections.announcement-bar.settings.show_social_media.info"
                                    }
                                ],
                                "blocks": [
                                    {
                                        "type": "item",
                                        "icon": "normal",
                                        "name": "t:sections.announcement-bar.blocks.item.name",
                                        "settings": [
                                            {
                                                "id": "notice_link_text",
                                                "type": "text",
                                                "label": "t:sections.announcement-bar.blocks.item.settings.notice_link_text.label",
                                                "default": "30-day postage paid returns"
                                            },
                                            {
                                                "id": "notice_style",
                                                "type": "select",
                                                "label": "t:sections.announcement-bar.blocks.item.settings.notice_style.label",
                                                "default": "1",
                                                "options": [
                                                    {
                                                        "value": "",
                                                        "label": "t:sections.announcement-bar.blocks.item.settings.notice_style.options__0.label"
                                                    },
                                                    {
                                                        "value": "1",
                                                        "label": "t:sections.announcement-bar.blocks.item.settings.notice_style.options__1.label"
                                                    },
                                                    {
                                                        "value": "2",
                                                        "label": "t:sections.announcement-bar.blocks.item.settings.notice_style.options__2.label"
                                                    },
                                                    {
                                                        "value": "3",
                                                        "label": "t:sections.announcement-bar.blocks.item.settings.notice_style.options__3.label"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "url",
                                                "id": "notice_link",
                                                "label": "t:sections.announcement-bar.blocks.item.settings.notice_link.label"
                                            },
                                            {
                                                "type": "select",
                                                "id": "text_align",
                                                "label": "t:sections.announcement-bar.blocks.item.settings.text_align.label",
                                                "default": "center",
                                                "options": [
                                                    {
                                                        "value": "left",
                                                        "label": "t:sections.announcement-bar.blocks.item.settings.text_align.options__0.label"
                                                    },
                                                    {
                                                        "value": "center",
                                                        "label": "t:sections.announcement-bar.blocks.item.settings.text_align.options__1.label"
                                                    },
                                                    {
                                                        "value": "right",
                                                        "label": "t:sections.announcement-bar.blocks.item.settings.text_align.options__2.label"
                                                    }
                                                ]
                                            },
                                            {
                                                "id": "announcement_division_bottom",
                                                "type": "switch",
                                                "label": "t:sections.announcement-bar.blocks.item.settings.announcement_division_bottom.label",
                                                "default": true
                                            }
                                        ]
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "type": "SECTION",
                        "id": "header",
                        "config": {
                            "sectionId": "header",
                            "type": "header",
                            "disabled": false,
                            "settingsData": {
                                "disabled": false,
                                "type": "header",
                                "settings": {
                                    "color_scheme": {
                                        "value": ""
                                    },
                                    "desktop_logo_width": {
                                        "value": 100
                                    },
                                    "mobile_logo_width": {
                                        "value": 100
                                    },
                                    "main_menu_link_list_effect": {
                                        "value": false
                                    },
                                    "mega_menu_images_ratio": {
                                        "value": "50"
                                    },
                                    "navigation_layout": {
                                        "value": "left-left"
                                    },
                                    "user_mobile_layout": {
                                        "value": "menu"
                                    },
                                    "mobile_top_menu_show_home": {
                                        "value": false
                                    },
                                    "header_style": {
                                        "value": true
                                    },
                                    "header_full_width": {
                                        "value": false
                                    },
                                    "show_line_separator": {
                                        "value": true
                                    },
                                    "show_search_entry": {
                                        "value": true
                                    },
                                    "show_user_entry": {
                                        "value": true
                                    },
                                    "hover_show_user_menu": {
                                        "value": false
                                    },
                                    "user_menu_text_1": {
                                        "value": ""
                                    },
                                    "user_menu_link_1": {
                                        "value": ""
                                    },
                                    "user_menu_text_2": {
                                        "value": ""
                                    },
                                    "user_menu_link_2": {
                                        "value": ""
                                    },
                                    "user_menu_text_3": {
                                        "value": ""
                                    },
                                    "user_menu_link_3": {
                                        "value": ""
                                    },
                                    "show_cart_entry": {
                                        "value": true
                                    },
                                    "show_country_selector": {
                                        "value": false
                                    },
                                    "show_locale_selector": {
                                        "value": false
                                    },
                                    "padding_top": {
                                        "value": 0
                                    },
                                    "padding_bottom": {
                                        "value": 0
                                    },
                                    "header_division": {
                                        "value": false
                                    },
                                    "mobile_top_menu": {
                                        "value": ""
                                    },
                                    "suggested_menu": {
                                        "value": ""
                                    },
                                    "main_menu_link_list": {
                                        "value": "head",
                                        "resource": {
                                            "id": "7118464746349400300",
                                            "name": "Main menu",
                                            "type": 0,
                                            "status": 1,
                                            "nodeTree": [
                                                {
                                                    "id": "1",
                                                    "name": {
                                                        "en": "Home",
                                                        "zh-hans-cn": "首页",
                                                        "default": "Home"
                                                    },
                                                    "nodeType": 1,
                                                    "pageLink": "{\"pageType\":\"0\",\"id\":\"home\"}",
                                                    "handle": null,
                                                    "openMode": 1,
                                                    "childNodes": []
                                                },
                                                {
                                                    "id": "2",
                                                    "name": {
                                                        "en": "Collections",
                                                        "zh-hans-cn": "分类页",
                                                        "default": "Collections"
                                                    },
                                                    "nodeType": 9,
                                                    "pageLink": null,
                                                    "handle": null,
                                                    "openMode": 1,
                                                    "childNodes": []
                                                },
                                                {
                                                    "id": "3",
                                                    "name": {
                                                        "en": "All products",
                                                        "zh-hans-cn": "全部商品列表",
                                                        "default": "All products"
                                                    },
                                                    "nodeType": 7,
                                                    "pageLink": null,
                                                    "handle": null,
                                                    "openMode": 1,
                                                    "childNodes": []
                                                },
                                                {
                                                    "id": "7138695721897455445",
                                                    "name": {
                                                        "default": "SECOND SKIN WITH KATHRYN BOWEN",
                                                        "en": "SECOND SKIN WITH KATHRYN BOWEN"
                                                    },
                                                    "nodeType": 4,
                                                    "pageLink": "{\"collectionId\":\"689566ea07a8c0690b444910\",\"id\":\"689566ea07a8c0690b444912\"}",
                                                    "handle": null,
                                                    "openMode": null,
                                                    "childNodes": []
                                                }
                                            ],
                                            "handle": "main-menu"
                                        }
                                    }
                                },
                                "blocks": {}
                            },
                            "schema": {
                                "name": "t:sections.header.name",
                                "settings": [
                                    {
                                        "id": "color_scheme",
                                        "type": "select",
                                        "label": "t:sections.header.settings.color_scheme.label",
                                        "default": "",
                                        "options": [
                                            {
                                                "value": "",
                                                "label": "t:sections.header.settings.color_scheme.options__0.label"
                                            },
                                            {
                                                "value": "1",
                                                "label": "t:sections.header.settings.color_scheme.options__1.label"
                                            },
                                            {
                                                "value": "2",
                                                "label": "t:sections.header.settings.color_scheme.options__2.label"
                                            },
                                            {
                                                "value": "3",
                                                "label": "t:sections.header.settings.color_scheme.options__3.label"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "header_full_width",
                                        "type": "switch",
                                        "label": "t:sections.header.settings.header_full_width.label",
                                        "default": false
                                    },
                                    {
                                        "id": "header_division_bottom",
                                        "type": "switch",
                                        "label": "t:sections.header.settings.header_division_bottom.label",
                                        "default": false
                                    },
                                    {
                                        "type": "group_header",
                                        "label": "t:sections.header.settings.group_header__0.label"
                                    },
                                    {
                                        "type": "image_picker",
                                        "id": "logo",
                                        "label": "t:sections.header.settings.logo.label"
                                    },
                                    {
                                        "type": "range",
                                        "id": "desktop_logo_width",
                                        "label": "t:sections.header.settings.desktop_logo_width.label",
                                        "default": 100,
                                        "min": 100,
                                        "max": 400,
                                        "step": 10,
                                        "unit": "px"
                                    },
                                    {
                                        "type": "range",
                                        "id": "mobile_logo_width",
                                        "label": "t:sections.header.settings.mobile_logo_width.label",
                                        "default": 100,
                                        "min": 60,
                                        "max": 200,
                                        "step": 10,
                                        "unit": "px"
                                    },
                                    {
                                        "type": "group_header",
                                        "label": "t:sections.header.settings.group_header__1.label",
                                        "direction": "horizontal",
                                        "info": "t:sections.header.settings.group_header__1.info"
                                    },
                                    {
                                        "type": "switch",
                                        "id": "main_menu_link_list_effect",
                                        "label": "t:sections.header.settings.main_menu_link_list_effect.label",
                                        "default": false
                                    },
                                    {
                                        "type": "menu_picker",
                                        "id": "main_menu_link_list",
                                        "label": "t:sections.header.settings.main_menu_link_list.label",
                                        "default": "head"
                                    },
                                    {
                                        "type": "menu_picker",
                                        "id": "mobile_main_menu_link_list",
                                        "label": "t:sections.header.settings.mobile_main_menu_link_list.label"
                                    },
                                    {
                                        "type": "select",
                                        "id": "main_menu_layout",
                                        "label": "t:sections.header.settings.main_menu_layout.label",
                                        "default": "dropdown",
                                        "options": [
                                            {
                                                "value": "dropdown",
                                                "label": "t:sections.header.settings.main_menu_layout.options__0.label"
                                            },
                                            {
                                                "value": "drawer",
                                                "label": "t:sections.header.settings.main_menu_layout.options__1.label"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "select",
                                        "id": "navigation_layout",
                                        "label": "t:sections.header.settings.navigation_layout.label",
                                        "default": "left-left",
                                        "options": [
                                            {
                                                "value": "left-left",
                                                "label": "t:sections.header.settings.navigation_layout.options__0.label"
                                            },
                                            {
                                                "value": "left-line",
                                                "label": "t:sections.header.settings.navigation_layout.options__1.label"
                                            },
                                            {
                                                "value": "middle-left",
                                                "label": "t:sections.header.settings.navigation_layout.options__2.label"
                                            },
                                            {
                                                "value": "middle-line",
                                                "label": "t:sections.header.settings.navigation_layout.options__3.label"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "menu_picker",
                                        "id": "mobile_top_menu",
                                        "label": "t:sections.header.settings.mobile_top_menu.label",
                                        "info": "t:sections.header.settings.mobile_top_menu.info",
                                        "default": ""
                                    },
                                    {
                                        "type": "switch",
                                        "id": "mobile_top_menu_show_home",
                                        "label": "t:sections.header.settings.mobile_top_menu_show_home.label",
                                        "info": "t:sections.header.settings.mobile_top_menu_show_home.info",
                                        "default": false
                                    },
                                    {
                                        "type": "switch",
                                        "id": "mega_menu_images",
                                        "label": "t:sections.header.settings.mega_menu_images.label",
                                        "info": "t:sections.header.settings.mega_menu_images.info",
                                        "default": false
                                    },
                                    {
                                        "type": "select",
                                        "id": "mega_menu_images_ratio",
                                        "label": "t:sections.header.settings.mega_menu_images_ratio.label",
                                        "default": "50",
                                        "options": [
                                            {
                                                "value": "50",
                                                "label": "t:sections.header.settings.mega_menu_images_ratio.options__0.label"
                                            },
                                            {
                                                "value": "100",
                                                "label": "t:sections.header.settings.mega_menu_images_ratio.options__1.label"
                                            },
                                            {
                                                "value": "75",
                                                "label": "t:sections.header.settings.mega_menu_images_ratio.options__2.label"
                                            },
                                            {
                                                "value": "150",
                                                "label": "t:sections.header.settings.mega_menu_images_ratio.options__3.label"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "select",
                                        "id": "user_mobile_layout",
                                        "label": "t:sections.header.settings.user_mobile_layout.label",
                                        "default": "menu",
                                        "options": [
                                            {
                                                "value": "home",
                                                "label": "t:sections.header.settings.user_mobile_layout.options__0.label"
                                            },
                                            {
                                                "value": "menu",
                                                "label": "t:sections.header.settings.user_mobile_layout.options__1.label"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "switch",
                                        "id": "header_style",
                                        "label": "t:sections.header.settings.header_style.label",
                                        "default": true
                                    },
                                    {
                                        "type": "switch",
                                        "id": "sticky_index",
                                        "label": "t:sections.header.settings.sticky_index.label",
                                        "default": false
                                    },
                                    {
                                        "type": "switch",
                                        "id": "sticky_collection",
                                        "label": "t:sections.header.settings.sticky_collection.label",
                                        "info": "t:sections.header.settings.sticky_collection.info",
                                        "default": false
                                    },
                                    {
                                        "type": "switch",
                                        "id": "show_line_separator",
                                        "default": true,
                                        "label": "t:sections.header.settings.show_line_separator.label"
                                    },
                                    {
                                        "type": "switch",
                                        "id": "show_search_entry",
                                        "default": true,
                                        "label": "t:sections.header.settings.show_search_entry.label"
                                    },
                                    {
                                        "type": "menu_picker",
                                        "id": "suggested_menu",
                                        "default": "",
                                        "label": "t:sections.header.settings.suggested_menu.label",
                                        "info": "t:sections.header.settings.suggested_menu.info"
                                    },
                                    {
                                        "type": "switch",
                                        "id": "show_user_entry",
                                        "default": true,
                                        "label": "t:sections.header.settings.show_user_entry.label"
                                    },
                                    {
                                        "type": "switch",
                                        "id": "hover_show_user_menu",
                                        "default": false,
                                        "label": "t:sections.header.settings.hover_show_user_menu.label"
                                    },
                                    {
                                        "type": "text",
                                        "id": "user_menu_text_1",
                                        "default": "",
                                        "label": "t:sections.header.settings.user_menu_text_1.label"
                                    },
                                    {
                                        "type": "url",
                                        "id": "user_menu_link_1",
                                        "default": "",
                                        "label": "t:sections.header.settings.user_menu_link_1.label"
                                    },
                                    {
                                        "type": "text",
                                        "id": "user_menu_text_2",
                                        "default": "",
                                        "label": "t:sections.header.settings.user_menu_text_2.label"
                                    },
                                    {
                                        "type": "url",
                                        "id": "user_menu_link_2",
                                        "default": "",
                                        "label": "t:sections.header.settings.user_menu_link_2.label"
                                    },
                                    {
                                        "type": "text",
                                        "id": "user_menu_text_3",
                                        "default": "",
                                        "label": "t:sections.header.settings.user_menu_text_3.label"
                                    },
                                    {
                                        "type": "url",
                                        "id": "user_menu_link_3",
                                        "default": "",
                                        "label": "t:sections.header.settings.user_menu_link_3.label"
                                    },
                                    {
                                        "type": "switch",
                                        "id": "show_cart_entry",
                                        "default": true,
                                        "label": "t:sections.header.settings.show_cart_entry.label"
                                    },
                                    {
                                        "type": "select",
                                        "id": "show_locale_selector_position",
                                        "default": "aside",
                                        "label": "t:sections.header.settings.show_locale_selector_position.label",
                                        "options": [
                                            {
                                                "value": "top",
                                                "label": "t:sections.header.settings.show_locale_selector_position.options__0.label"
                                            },
                                            {
                                                "value": "aside",
                                                "label": "t:sections.header.settings.show_locale_selector_position.options__1.label"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "switch",
                                        "id": "show_locale_selector",
                                        "label": "t:sections.header.settings.show_locale_selector.label",
                                        "info": "t:sections.header.settings.show_locale_selector.info",
                                        "default": false
                                    },
                                    {
                                        "type": "switch",
                                        "id": "show_country_selector",
                                        "label": "t:sections.header.settings.show_country_selector.label",
                                        "info": "t:sections.header.settings.show_country_selector.info",
                                        "default": false
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "type": "TEMPLATE",
                        "order": [
                            "image-banner",
                            "rich-text",
                            "featured-collection",
                            "multi-media-splicing",
                            "video",
                            "text-columns-with-images",
                            "app-block-instagram"
                        ],
                        "sections": {
                            "image-banner": {
                                "sectionId": "image-banner",
                                "type": "image-banner",
                                "disabled": false,
                                "settingsData": {
                                    "disabled": false,
                                    "type": "image-banner",
                                    "settings": {
                                        "full_screen": {
                                            "value": true
                                        },
                                        "banner_height_size": {
                                            "value": "middle"
                                        },
                                        "override_banner_height": {
                                            "value": false
                                        },
                                        "pc_text_position": {
                                            "value": "center"
                                        },
                                        "pc_show_textarea": {
                                            "value": false
                                        },
                                        "alpha_range": {
                                            "value": "30"
                                        },
                                        "color_scheme": {
                                            "value": "none"
                                        },
                                        "mobile_banner_flatten": {
                                            "value": true
                                        },
                                        "m_show_textarea": {
                                            "value": true
                                        },
                                        "banner1": {
                                            "value": {}
                                        },
                                        "banner2": {
                                            "value": {}
                                        }
                                    },
                                    "blocks": {
                                        "banner-title": {
                                            "type": "title",
                                            "settings": {
                                                "title": {
                                                    "value": "Two Line\nTitle Slide"
                                                },
                                                "title_size": {
                                                    "value": "medium"
                                                }
                                            }
                                        },
                                        "banner-desc": {
                                            "type": "desc",
                                            "settings": {
                                                "description": {
                                                    "value": "And optional subtext"
                                                }
                                            }
                                        },
                                        "banner-button": {
                                            "type": "button",
                                            "settings": {
                                                "button_text": {
                                                    "value": "Shop this"
                                                },
                                                "link": {
                                                    "value": ""
                                                },
                                                "outline_button": {
                                                    "value": true
                                                },
                                                "link_text_2": {
                                                    "value": "Shop all"
                                                },
                                                "link_2": {
                                                    "value": ""
                                                },
                                                "outline_button_2": {
                                                    "value": true
                                                }
                                            }
                                        }
                                    },
                                    "block_order": [
                                        "banner-title",
                                        "banner-desc",
                                        "banner-button"
                                    ]
                                },
                                "schema": {
                                    "name": "t:sections.image-banner.name",
                                    "settings": [
                                        {
                                            "id": "banner1",
                                            "type": "image_picker",
                                            "label": "t:sections.image-banner.settings.banner1.label"
                                        },
                                        {
                                            "id": "mb_banner1",
                                            "type": "image_picker",
                                            "label": "t:sections.image-banner.settings.mb_banner1.label"
                                        },
                                        {
                                            "id": "banner2",
                                            "type": "image_picker",
                                            "label": "t:sections.image-banner.settings.banner2.label"
                                        },
                                        {
                                            "id": "mb_banner2",
                                            "type": "image_picker",
                                            "label": "t:sections.image-banner.settings.mb_banner2.label"
                                        },
                                        {
                                            "id": "banner_height_size",
                                            "type": "select",
                                            "label": "t:sections.image-banner.settings.banner_height_size.label",
                                            "info": "t:sections.image-banner.settings.banner_height_size.info",
                                            "options": [
                                                {
                                                    "value": "low",
                                                    "label": "t:sections.image-banner.settings.banner_height_size.options__0.label"
                                                },
                                                {
                                                    "label": "t:sections.image-banner.settings.banner_height_size.options__1.label",
                                                    "value": "middle"
                                                },
                                                {
                                                    "value": "high",
                                                    "label": "t:sections.image-banner.settings.banner_height_size.options__2.label"
                                                }
                                            ],
                                            "default": "middle"
                                        },
                                        {
                                            "id": "override_banner_height",
                                            "type": "switch",
                                            "label": "t:sections.image-banner.settings.override_banner_height.label",
                                            "info": "t:sections.image-banner.settings.override_banner_height.info",
                                            "default": false
                                        },
                                        {
                                            "type": "switch",
                                            "id": "full_screen",
                                            "label": "t:sections.image-banner.settings.full_screen.label",
                                            "default": true
                                        },
                                        {
                                            "id": "pc_text_position",
                                            "type": "select",
                                            "label": "t:sections.image-banner.settings.pc_text_position.label",
                                            "options": [
                                                {
                                                    "label": "t:sections.image-banner.settings.pc_text_position.options__0.label",
                                                    "value": "left-top"
                                                },
                                                {
                                                    "label": "t:sections.image-banner.settings.pc_text_position.options__1.label",
                                                    "value": "top"
                                                },
                                                {
                                                    "label": "t:sections.image-banner.settings.pc_text_position.options__2.label",
                                                    "value": "right-top"
                                                },
                                                {
                                                    "label": "t:sections.image-banner.settings.pc_text_position.options__3.label",
                                                    "value": "left"
                                                },
                                                {
                                                    "label": "t:sections.image-banner.settings.pc_text_position.options__4.label",
                                                    "value": "center"
                                                },
                                                {
                                                    "label": "t:sections.image-banner.settings.pc_text_position.options__5.label",
                                                    "value": "right"
                                                },
                                                {
                                                    "label": "t:sections.image-banner.settings.pc_text_position.options__6.label",
                                                    "value": "left-bottom"
                                                },
                                                {
                                                    "label": "t:sections.image-banner.settings.pc_text_position.options__7.label",
                                                    "value": "bottom"
                                                },
                                                {
                                                    "label": "t:sections.image-banner.settings.pc_text_position.options__8.label",
                                                    "value": "right-bottom"
                                                }
                                            ],
                                            "default": "center"
                                        },
                                        {
                                            "id": "pc_show_textarea",
                                            "type": "switch",
                                            "label": "t:sections.image-banner.settings.pc_show_textarea.label",
                                            "default": false
                                        },
                                        {
                                            "id": "alpha_range",
                                            "label": "t:sections.image-banner.settings.alpha_range.label",
                                            "type": "range",
                                            "default": "30",
                                            "min": 0,
                                            "max": 100,
                                            "step": 1,
                                            "unit": "%"
                                        },
                                        {
                                            "type": "select",
                                            "id": "color_scheme",
                                            "default": "none",
                                            "label": "t:sections.image-banner.settings.color_scheme.label",
                                            "options": [
                                                {
                                                    "value": "none",
                                                    "label": "t:sections.image-banner.settings.color_scheme.options__0.label"
                                                },
                                                {
                                                    "label": "t:sections.image-banner.settings.color_scheme.options__1.label",
                                                    "value": "1"
                                                },
                                                {
                                                    "label": "t:sections.image-banner.settings.color_scheme.options__2.label",
                                                    "value": "2"
                                                },
                                                {
                                                    "label": "t:sections.image-banner.settings.color_scheme.options__3.label",
                                                    "value": "3"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "group_header",
                                            "label": "t:sections.image-banner.settings.group_header__0.label"
                                        },
                                        {
                                            "id": "mobile_banner_flatten",
                                            "type": "switch",
                                            "label": "t:sections.image-banner.settings.mobile_banner_flatten.label",
                                            "default": true
                                        },
                                        {
                                            "id": "m_show_textarea",
                                            "type": "switch",
                                            "label": "t:sections.image-banner.settings.m_show_textarea.label",
                                            "default": true
                                        }
                                    ],
                                    "max_blocks": 3,
                                    "blocks": [
                                        {
                                            "limit": 1,
                                            "icon": "title",
                                            "type": "title",
                                            "name": "t:sections.image-banner.blocks.title.name",
                                            "settings": [
                                                {
                                                    "type": "textarea",
                                                    "limit": 500,
                                                    "id": "title",
                                                    "label": "t:sections.image-banner.blocks.title.settings.title.label",
                                                    "default": "Two Line\nTitle Slide"
                                                },
                                                {
                                                    "type": "select",
                                                    "id": "title_size",
                                                    "label": "t:sections.image-banner.blocks.title.settings.title_size.label",
                                                    "options": [
                                                        {
                                                            "value": "medium",
                                                            "label": "t:sections.image-banner.blocks.title.settings.title_size.options__0.label"
                                                        },
                                                        {
                                                            "value": "large",
                                                            "label": "t:sections.image-banner.blocks.title.settings.title_size.options__1.label"
                                                        }
                                                    ],
                                                    "default": "medium"
                                                }
                                            ]
                                        },
                                        {
                                            "limit": 1,
                                            "icon": "paragraph",
                                            "type": "desc",
                                            "name": "t:sections.image-banner.blocks.desc.name",
                                            "settings": [
                                                {
                                                    "id": "description",
                                                    "type": "text",
                                                    "default": "And optional subtext",
                                                    "label": "t:sections.image-banner.blocks.desc.settings.description.label"
                                                }
                                            ]
                                        },
                                        {
                                            "limit": 1,
                                            "icon": "button",
                                            "type": "button",
                                            "name": "t:sections.image-banner.blocks.button.name",
                                            "settings": [
                                                {
                                                    "type": "text",
                                                    "id": "button_text",
                                                    "label": "t:sections.image-banner.blocks.button.settings.button_text.label",
                                                    "default": "Shop this"
                                                },
                                                {
                                                    "type": "url",
                                                    "id": "link",
                                                    "label": "t:sections.image-banner.blocks.button.settings.link.label"
                                                },
                                                {
                                                    "id": "outline_button",
                                                    "type": "switch",
                                                    "default": true,
                                                    "label": "t:sections.image-banner.blocks.button.settings.outline_button.label"
                                                },
                                                {
                                                    "type": "text",
                                                    "id": "link_text_2",
                                                    "label": "t:sections.image-banner.blocks.button.settings.link_text_2.label",
                                                    "default": "Shop all"
                                                },
                                                {
                                                    "type": "url",
                                                    "id": "link_2",
                                                    "label": "t:sections.image-banner.blocks.button.settings.link_2.label"
                                                },
                                                {
                                                    "id": "outline_button_2",
                                                    "type": "switch",
                                                    "default": true,
                                                    "label": "t:sections.image-banner.blocks.button.settings.outline_button_2.label"
                                                }
                                            ]
                                        }
                                    ],
                                    "presets": [
                                        {
                                            "name": "t:sections.image-banner.presets.presets__0.name",
                                            "category_index": 2,
                                            "category": "t:sections.image-banner.presets.presets__0.category",
                                            "settings": {
                                                "full_screen": true,
                                                "banner1": "",
                                                "banner2": "",
                                                "banner_height_size": "middle",
                                                "override_banner_height": false,
                                                "pc_text_position": "center",
                                                "pc_show_textarea": false,
                                                "alpha_range": "30",
                                                "color_scheme": "none",
                                                "mobile_banner_flatten": true,
                                                "m_show_textarea": true
                                            },
                                            "blocks": [
                                                {
                                                    "type": "title",
                                                    "settings": {
                                                        "title": "Two Line\nTitle Slide",
                                                        "title_size": "medium"
                                                    }
                                                },
                                                {
                                                    "type": "desc",
                                                    "settings": {
                                                        "description": "And optional subtext"
                                                    }
                                                },
                                                {
                                                    "type": "button",
                                                    "settings": {
                                                        "button_text": "Shop this",
                                                        "link": "",
                                                        "outline_button": true,
                                                        "link_text_2": "Shop all",
                                                        "link_2": "",
                                                        "outline_button_2": true
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            "faqs": {
                                "sectionId": "faqs",
                                "type": "faqs",
                                "disabled": false,
                                "settingsData": {
                                    "disabled": false,
                                    "type": "faqs",
                                    "settings": {
                                        "title": {
                                            "value": "FAQS"
                                        },
                                        "title_align": {
                                            "value": "center"
                                        },
                                        "color_scheme": {
                                            "value": "none"
                                        }
                                    },
                                    "blocks": {
                                        "faq1": {
                                            "type": "textRow",
                                            "settings": {
                                                "title": {
                                                    "value": "Frequently asked question"
                                                },
                                                "question_text": {
                                                    "value": "Use this text to answer questions in as much detail as possible for your customers."
                                                }
                                            }
                                        },
                                        "faq2": {
                                            "type": "textRow",
                                            "settings": {
                                                "title": {
                                                    "value": "Frequently asked question"
                                                },
                                                "question_text": {
                                                    "value": "Use this text to answer questions in as much detail as possible for your customers."
                                                }
                                            }
                                        },
                                        "faq3": {
                                            "type": "textRow",
                                            "settings": {
                                                "title": {
                                                    "value": "Frequently asked question"
                                                },
                                                "question_text": {
                                                    "value": "Use this text to answer questions in as much detail as possible for your customers."
                                                }
                                            }
                                        },
                                        "text": {
                                            "type": "richText",
                                            "settings": {
                                                "title": {
                                                    "value": "Frequently asked question"
                                                },
                                                "richtext_text": {
                                                    "value": "Use this text to answer questions in as much detail as possible for your customers."
                                                }
                                            }
                                        }
                                    },
                                    "block_order": [
                                        "faq1",
                                        "faq2",
                                        "faq3",
                                        "text"
                                    ]
                                },
                                "schema": {
                                    "name": "t:sections.faqs.name",
                                    "max_blocks": 10,
                                    "settings": [
                                        {
                                            "type": "text",
                                            "id": "title",
                                            "default": "FAQS",
                                            "label": "t:sections.faqs.settings.title.label"
                                        },
                                        {
                                            "id": "title_align",
                                            "type": "text_align",
                                            "label": "t:sections.faqs.settings.title_align.label",
                                            "default": "center"
                                        },
                                        {
                                            "type": "select",
                                            "id": "color_scheme",
                                            "label": "t:sections.faqs.settings.color_scheme.label",
                                            "default": "none",
                                            "options": [
                                                {
                                                    "value": "none",
                                                    "label": "t:sections.faqs.settings.color_scheme.options__0.label"
                                                },
                                                {
                                                    "value": "1",
                                                    "label": "t:sections.faqs.settings.color_scheme.options__1.label"
                                                },
                                                {
                                                    "value": "2",
                                                    "label": "t:sections.faqs.settings.color_scheme.options__2.label"
                                                },
                                                {
                                                    "value": "3",
                                                    "label": "t:sections.faqs.settings.color_scheme.options__3.label"
                                                }
                                            ]
                                        }
                                    ],
                                    "blocks": [
                                        {
                                            "type": "textRow",
                                            "icon": "text",
                                            "name": "t:sections.faqs.blocks.textRow.name",
                                            "settings": [
                                                {
                                                    "id": "title",
                                                    "type": "text",
                                                    "default": "Frequently asked question",
                                                    "label": "t:sections.faqs.blocks.textRow.settings.title.label"
                                                },
                                                {
                                                    "id": "question_text",
                                                    "type": "richtext",
                                                    "default": "Use this text to answer questions in as much detail as possible for your customers.",
                                                    "label": "t:sections.faqs.blocks.textRow.settings.question_text.label"
                                                },
                                                {
                                                    "id": "textrow_align",
                                                    "type": "text_align",
                                                    "label": "t:sections.faqs.blocks.textRow.settings.textrow_align.label",
                                                    "default": "left",
                                                    "options": [
                                                        {
                                                            "value": "left"
                                                        },
                                                        {
                                                            "value": "center"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "richText",
                                            "icon": "text",
                                            "name": "t:sections.faqs.blocks.richText.name",
                                            "settings": [
                                                {
                                                    "id": "title",
                                                    "type": "text",
                                                    "default": "Rich text",
                                                    "label": "t:sections.faqs.blocks.richText.settings.title.label"
                                                },
                                                {
                                                    "id": "richtext_text",
                                                    "type": "richtext",
                                                    "default": "Use this section for any descriptive text you need to fill out your pages or to add introductory headings between other blocks.",
                                                    "label": "t:sections.faqs.blocks.richText.settings.richtext_text.label"
                                                },
                                                {
                                                    "id": "richtext_align",
                                                    "type": "text_align",
                                                    "default": "center",
                                                    "label": "t:sections.faqs.blocks.richText.settings.richtext_align.label",
                                                    "options": [
                                                        {
                                                            "value": "left"
                                                        },
                                                        {
                                                            "value": "center"
                                                        },
                                                        {
                                                            "value": "right"
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ],
                                    "presets": [
                                        {
                                            "name": "t:sections.faqs.presets.presets__0.name",
                                            "category_index": 7,
                                            "category": "t:sections.faqs.presets.presets__0.category",
                                            "settings": {
                                                "title": "FAQS",
                                                "title_align": "center",
                                                "color_scheme": "none"
                                            },
                                            "blocks": [
                                                {
                                                    "type": "textRow",
                                                    "settings": {
                                                        "title": "Frequently asked question",
                                                        "question_text": "Use this text to answer questions in as much detail as possible for your customers."
                                                    }
                                                },
                                                {
                                                    "type": "textRow",
                                                    "settings": {
                                                        "title": "Frequently asked question",
                                                        "question_text": "Use this text to answer questions in as much detail as possible for your customers."
                                                    }
                                                },
                                                {
                                                    "type": "textRow",
                                                    "settings": {
                                                        "title": "Frequently asked question",
                                                        "question_text": "Use this text to answer questions in as much detail as possible for your customers."
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            "rich-text": {
                                "sectionId": "rich-text",
                                "type": "rich-text",
                                "disabled": false,
                                "settingsData": {
                                    "disabled": false,
                                    "type": "rich-text",
                                    "settings": {
                                        "color_scheme": {
                                            "value": ""
                                        },
                                        "normal_width": {
                                            "value": true
                                        }
                                    },
                                    "blocks": {
                                        "heading": {
                                            "type": "heading",
                                            "settings": {
                                                "heading": {
                                                    "value": "3334567"
                                                },
                                                "heading_size": {
                                                    "value": "large"
                                                }
                                            },
                                            "custom_css": []
                                        },
                                        "text": {
                                            "type": "text",
                                            "settings": {
                                                "text": {
                                                    "value": "<p>A sentence or two introducing your brand, what you sell, and what makes your brand compelling to customers.</p>"
                                                }
                                            }
                                        },
                                        "button": {
                                            "type": "button",
                                            "settings": {
                                                "button_text": {
                                                    "value": ""
                                                },
                                                "outline_button": {
                                                    "value": false
                                                }
                                            }
                                        }
                                    },
                                    "block_order": [
                                        "heading",
                                        "text",
                                        "button"
                                    ],
                                    "custom_css": []
                                },
                                "schema": {
                                    "name": "t:sections.rich-text.name",
                                    "type": "rich-text",
                                    "max_blocks": 3,
                                    "blocks": [
                                        {
                                            "type": "heading",
                                            "icon": "title",
                                            "limit": 1,
                                            "name": "t:sections.rich-text.blocks.heading.name",
                                            "settings": [
                                                {
                                                    "id": "heading",
                                                    "type": "text",
                                                    "default": "",
                                                    "label": "t:sections.rich-text.blocks.heading.settings.heading.label"
                                                },
                                                {
                                                    "id": "heading_size",
                                                    "type": "select",
                                                    "default": "middle",
                                                    "limit": 1,
                                                    "label": "t:sections.rich-text.blocks.heading.settings.heading_size.label",
                                                    "options": [
                                                        {
                                                            "value": "small",
                                                            "label": "t:sections.rich-text.blocks.heading.settings.heading_size.options__0.label"
                                                        },
                                                        {
                                                            "value": "middle",
                                                            "label": "t:sections.rich-text.blocks.heading.settings.heading_size.options__1.label"
                                                        },
                                                        {
                                                            "value": "large",
                                                            "label": "t:sections.rich-text.blocks.heading.settings.heading_size.options__2.label"
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "type": "text",
                                            "name": "t:sections.rich-text.blocks.text.name",
                                            "icon": "paragraph",
                                            "limit": 1,
                                            "settings": [
                                                {
                                                    "id": "text",
                                                    "type": "richtext",
                                                    "default": "<p>A sentence or two introducing your brand, what you sell, and what makes your brand compelling to customers.</p>",
                                                    "label": "t:sections.rich-text.blocks.text.settings.text.label"
                                                },
                                                {
                                                    "id": "expansion",
                                                    "type": "switch",
                                                    "label": "t:sections.rich-text.blocks.text.settings.expansion.label",
                                                    "default": true
                                                }
                                            ]
                                        },
                                        {
                                            "type": "button",
                                            "name": "t:sections.rich-text.blocks.button.name",
                                            "icon": "button",
                                            "limit": 1,
                                            "settings": [
                                                {
                                                    "id": "button_text",
                                                    "type": "text",
                                                    "default": "",
                                                    "label": "t:sections.rich-text.blocks.button.settings.button_text.label"
                                                },
                                                {
                                                    "id": "jump_link",
                                                    "type": "url",
                                                    "label": "t:sections.rich-text.blocks.button.settings.jump_link.label"
                                                },
                                                {
                                                    "id": "outline_button",
                                                    "type": "switch",
                                                    "default": false,
                                                    "label": "t:sections.rich-text.blocks.button.settings.outline_button.label"
                                                }
                                            ]
                                        }
                                    ],
                                    "settings": [
                                        {
                                            "type": "select",
                                            "id": "color_scheme",
                                            "label": "t:sections.rich-text.settings.color_scheme.label",
                                            "default": "",
                                            "options": [
                                                {
                                                    "value": "",
                                                    "label": "t:sections.rich-text.settings.color_scheme.options__0.label"
                                                },
                                                {
                                                    "value": "1",
                                                    "label": "t:sections.rich-text.settings.color_scheme.options__1.label"
                                                },
                                                {
                                                    "value": "2",
                                                    "label": "t:sections.rich-text.settings.color_scheme.options__2.label"
                                                },
                                                {
                                                    "value": "3",
                                                    "label": "t:sections.rich-text.settings.color_scheme.options__3.label"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "switch",
                                            "id": "normal_width",
                                            "default": true,
                                            "label": "t:sections.rich-text.settings.normal_width.label"
                                        },
                                        {
                                            "type": "select",
                                            "id": "pc_content_position",
                                            "label": "t:sections.rich-text.settings.pc_content_position.label",
                                            "default": "center",
                                            "options": [
                                                {
                                                    "value": "left",
                                                    "label": "t:sections.rich-text.settings.pc_content_position.options__0.label"
                                                },
                                                {
                                                    "value": "center",
                                                    "label": "t:sections.rich-text.settings.pc_content_position.options__1.label"
                                                },
                                                {
                                                    "value": "right",
                                                    "label": "t:sections.rich-text.settings.pc_content_position.options__2.label"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "select",
                                            "id": "text_align",
                                            "label": "t:sections.rich-text.settings.text_align.label",
                                            "default": "center",
                                            "options": [
                                                {
                                                    "value": "left",
                                                    "label": "t:sections.rich-text.settings.text_align.options__0.label"
                                                },
                                                {
                                                    "value": "center",
                                                    "label": "t:sections.rich-text.settings.text_align.options__1.label"
                                                },
                                                {
                                                    "value": "right",
                                                    "label": "t:sections.rich-text.settings.text_align.options__2.label"
                                                }
                                            ]
                                        }
                                    ],
                                    "presets": [
                                        {
                                            "name": "t:sections.rich-text.presets.presets__0.name",
                                            "category_index": 2,
                                            "category": "t:sections.rich-text.presets.presets__0.category",
                                            "blocks": [
                                                {
                                                    "type": "heading",
                                                    "settings": {
                                                        "heading": "",
                                                        "heading_size": "middle"
                                                    }
                                                },
                                                {
                                                    "type": "text",
                                                    "settings": {
                                                        "text": "<p>A sentence or two introducing your brand, what you sell, and what makes your brand compelling to customers.</p>"
                                                    }
                                                },
                                                {
                                                    "type": "button",
                                                    "settings": {
                                                        "button_text": "",
                                                        "outline_button": false
                                                    }
                                                }
                                            ],
                                            "settings": {
                                                "color_scheme": "",
                                                "normal_width": true,
                                                "pc_content_position": "center",
                                                "text_align": "center"
                                            }
                                        }
                                    ]
                                }
                            },
                            "featured-collection": {
                                "sectionId": "featured-collection",
                                "type": "featured-collection",
                                "disabled": false,
                                "settingsData": {
                                    "disabled": false,
                                    "type": "featured-collection",
                                    "settings": {
                                        "title": {
                                            "value": "Featured collection"
                                        },
                                        "title_align": {
                                            "value": "center"
                                        },
                                        "full_width": {
                                            "value": false
                                        },
                                        "products_num": {
                                            "value": 4
                                        },
                                        "pc_cols": {
                                            "value": 4
                                        },
                                        "md_cols": {
                                            "value": 2
                                        },
                                        "slice_in_mobile": {
                                            "value": true
                                        },
                                        "button_text": {
                                            "value": "View all"
                                        },
                                        "product_image_ratio": {
                                            "value": "0"
                                        },
                                        "product_fill_type": {
                                            "value": "contain"
                                        },
                                        "product_hover_show_next": {
                                            "value": false
                                        },
                                        "product_categories": {
                                            "value": ""
                                        }
                                    },
                                    "blocks": {},
                                    "block_order": []
                                },
                                "schema": {
                                    "name": "t:sections.featured-collection.name",
                                    "limit": 10,
                                    "class": "section-gap",
                                    "settings": [
                                        {
                                            "type": "text",
                                            "id": "title",
                                            "label": "t:sections.featured-collection.settings.title.label",
                                            "default": "Featured collection"
                                        },
                                        {
                                            "id": "title_align",
                                            "type": "text_align",
                                            "label": "t:sections.featured-collection.settings.title_align.label",
                                            "default": "center"
                                        },
                                        {
                                            "type": "switch",
                                            "id": "full_width",
                                            "label": "t:sections.featured-collection.settings.full_width.label",
                                            "default": false
                                        },
                                        {
                                            "id": "product_categories",
                                            "type": "collection_picker",
                                            "label": "t:sections.featured-collection.settings.product_categories.label",
                                            "default": ""
                                        },
                                        {
                                            "type": "group_header",
                                            "label": "t:sections.featured-collection.settings.group_header__0.label"
                                        },
                                        {
                                            "id": "products_num",
                                            "type": "range",
                                            "label": "t:sections.featured-collection.settings.products_num.label",
                                            "min": 2,
                                            "max": 24,
                                            "step": 1,
                                            "default": 4
                                        },
                                        {
                                            "id": "pc_cols",
                                            "type": "range",
                                            "label": "t:sections.featured-collection.settings.pc_cols.label",
                                            "min": 1,
                                            "max": 5,
                                            "step": 1,
                                            "default": 4
                                        },
                                        {
                                            "id": "md_cols",
                                            "type": "select",
                                            "label": "t:sections.featured-collection.settings.md_cols.label",
                                            "options": [
                                                {
                                                    "value": 1,
                                                    "label": "t:sections.featured-collection.settings.md_cols.options__0.label"
                                                },
                                                {
                                                    "value": 2,
                                                    "label": "t:sections.featured-collection.settings.md_cols.options__1.label"
                                                }
                                            ],
                                            "default": 2
                                        },
                                        {
                                            "type": "switch",
                                            "id": "slice_in_pc",
                                            "label": "t:sections.featured-collection.settings.slice_in_pc.label",
                                            "default": false
                                        },
                                        {
                                            "id": "slice_in_mobile",
                                            "type": "switch",
                                            "label": "t:sections.featured-collection.settings.slice_in_mobile.label",
                                            "default": true
                                        },
                                        {
                                            "type": "text",
                                            "id": "button_text",
                                            "label": "t:sections.featured-collection.settings.button_text.label",
                                            "info": "t:sections.featured-collection.settings.button_text.info",
                                            "default": "View all"
                                        },
                                        {
                                            "type": "switch",
                                            "id": "full_in_mobile",
                                            "label": "t:sections.featured-collection.settings.full_in_mobile.label",
                                            "default": false
                                        },
                                        {
                                            "type": "switch",
                                            "id": "button_follow_endof_list",
                                            "label": "t:sections.featured-collection.settings.button_follow_endof_list.label",
                                            "default": false
                                        },
                                        {
                                            "type": "group_header",
                                            "label": "t:sections.featured-collection.settings.group_header__1.label"
                                        },
                                        {
                                            "id": "product_image_ratio",
                                            "type": "select",
                                            "label": "t:sections.featured-collection.settings.product_image_ratio.label",
                                            "options": [
                                                {
                                                    "value": "0",
                                                    "label": "t:sections.featured-collection.settings.product_image_ratio.options__0.label"
                                                },
                                                {
                                                    "value": "100",
                                                    "label": "t:sections.featured-collection.settings.product_image_ratio.options__1.label"
                                                },
                                                {
                                                    "value": "133.33",
                                                    "label": "3:4"
                                                },
                                                {
                                                    "value": "75",
                                                    "label": "t:sections.featured-collection.settings.product_image_ratio.options__3.label"
                                                },
                                                {
                                                    "value": "150",
                                                    "label": "t:sections.featured-collection.settings.product_image_ratio.options__4.label"
                                                }
                                            ],
                                            "default": "0"
                                        },
                                        {
                                            "id": "product_fill_type",
                                            "type": "select",
                                            "label": "t:sections.featured-collection.settings.product_fill_type.label",
                                            "options": [
                                                {
                                                    "value": "contain",
                                                    "label": "t:sections.featured-collection.settings.product_fill_type.options__0.label"
                                                },
                                                {
                                                    "value": "cover",
                                                    "label": "t:sections.featured-collection.settings.product_fill_type.options__1.label"
                                                }
                                            ],
                                            "default": "contain"
                                        },
                                        {
                                            "id": "product_hover_show_next",
                                            "type": "switch",
                                            "label": "t:sections.featured-collection.settings.product_hover_show_next.label",
                                            "default": false
                                        }
                                    ],
                                    "presets": [
                                        {
                                            "name": "t:sections.featured-collection.presets.presets__0.name",
                                            "category_index": 1,
                                            "category": "t:sections.featured-collection.presets.presets__0.category",
                                            "settings": {
                                                "title": "Featured collection",
                                                "title_align": "center",
                                                "full_width": false,
                                                "product_categories": "",
                                                "products_num": 4,
                                                "pc_cols": 4,
                                                "md_cols": 2,
                                                "slice_in_pc": false,
                                                "slice_in_mobile": true,
                                                "full_in_mobile": false,
                                                "button_text": "View all",
                                                "product_image_ratio": "0",
                                                "product_fill_type": "contain",
                                                "product_hover_show_next": false
                                            }
                                        }
                                    ]
                                }
                            },
                            "video": {
                                "sectionId": "video",
                                "type": "video",
                                "disabled": false,
                                "settingsData": {
                                    "disabled": false,
                                    "type": "video",
                                    "settings": {
                                        "title": {
                                            "value": "Video"
                                        },
                                        "background_position": {
                                            "value": "center"
                                        },
                                        "color_scheme": {
                                            "value": ""
                                        },
                                        "full_width": {
                                            "value": false
                                        },
                                        "loop": {
                                            "value": false
                                        },
                                        "cover": {
                                            "value": {
                                                "url": ""
                                            }
                                        }
                                    },
                                    "blocks": {},
                                    "block_order": []
                                },
                                "schema": {
                                    "name": "t:sections.video.name",
                                    "icon": "video",
                                    "settings": [
                                        {
                                            "type": "text",
                                            "id": "title",
                                            "label": "t:sections.video.settings.title.label",
                                            "default": "Video"
                                        },
                                        {
                                            "type": "video_text",
                                            "id": "url",
                                            "format": "video",
                                            "placeholder": "https://www.youtube.com/watch?v=V7BEzkRBp_g",
                                            "info": "t:sections.video.settings.url.info",
                                            "label": "t:sections.video.settings.url.label"
                                        },
                                        {
                                            "type": "switch",
                                            "id": "autoplay",
                                            "label": "t:sections.video.settings.autoplay.label",
                                            "info": "t:sections.video.settings.autoplay.info",
                                            "default": false
                                        },
                                        {
                                            "type": "switch",
                                            "id": "quiet",
                                            "label": "t:sections.video.settings.quiet.label",
                                            "default": true
                                        },
                                        {
                                            "type": "switch",
                                            "id": "loop",
                                            "label": "t:sections.video.settings.loop.label",
                                            "default": false
                                        },
                                        {
                                            "type": "image_picker",
                                            "id": "cover",
                                            "label": "t:sections.video.settings.cover.label"
                                        },
                                        {
                                            "type": "select",
                                            "id": "background_position",
                                            "label": "t:sections.video.settings.background_position.label",
                                            "default": "center",
                                            "options": [
                                                {
                                                    "value": "left-top",
                                                    "label": "t:sections.video.settings.background_position.options__0.label"
                                                },
                                                {
                                                    "value": "top",
                                                    "label": "t:sections.video.settings.background_position.options__1.label"
                                                },
                                                {
                                                    "value": "right-top",
                                                    "label": "t:sections.video.settings.background_position.options__2.label"
                                                },
                                                {
                                                    "value": "left",
                                                    "label": "t:sections.video.settings.background_position.options__3.label"
                                                },
                                                {
                                                    "value": "center",
                                                    "label": "t:sections.video.settings.background_position.options__4.label"
                                                },
                                                {
                                                    "value": "right",
                                                    "label": "t:sections.video.settings.background_position.options__5.label"
                                                },
                                                {
                                                    "value": "left-bottom",
                                                    "label": "t:sections.video.settings.background_position.options__6.label"
                                                },
                                                {
                                                    "value": "bottom",
                                                    "label": "t:sections.video.settings.background_position.options__7.label"
                                                },
                                                {
                                                    "value": "right-bottom",
                                                    "label": "t:sections.video.settings.background_position.options__8.label"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "switch",
                                            "id": "full_width",
                                            "label": "t:sections.video.settings.full_width.label",
                                            "default": false
                                        },
                                        {
                                            "type": "select",
                                            "id": "color_scheme",
                                            "label": "t:sections.video.settings.color_scheme.label",
                                            "default": "",
                                            "options": [
                                                {
                                                    "value": "",
                                                    "label": "t:sections.video.settings.color_scheme.options__0.label"
                                                },
                                                {
                                                    "value": "1",
                                                    "label": "t:sections.video.settings.color_scheme.options__1.label"
                                                },
                                                {
                                                    "value": "2",
                                                    "label": "t:sections.video.settings.color_scheme.options__2.label"
                                                },
                                                {
                                                    "value": "3",
                                                    "label": "t:sections.video.settings.color_scheme.options__3.label"
                                                }
                                            ]
                                        }
                                    ],
                                    "presets": [
                                        {
                                            "name": "t:sections.video.presets.presets__0.name",
                                            "icon": "video",
                                            "category_index": 3,
                                            "category": "t:sections.video.presets.presets__0.category",
                                            "settings": {
                                                "title": "Video",
                                                "loop": false,
                                                "background_position": "center",
                                                "color_scheme": "",
                                                "full_width": false,
                                                "cover": {
                                                    "url": ""
                                                }
                                            }
                                        }
                                    ]
                                }
                            },
                            "multi-media-splicing": {
                                "sectionId": "multi-media-splicing",
                                "type": "multi-media-splicing",
                                "disabled": false,
                                "settingsData": {
                                    "disabled": false,
                                    "type": "multi-media-splicing",
                                    "settings": {
                                        "title_align": {
                                            "value": "center"
                                        },
                                        "desktop_layout": {
                                            "value": "left"
                                        },
                                        "mobile_layout": {
                                            "value": "splicing"
                                        },
                                        "color_scheme": {
                                            "value": ""
                                        }
                                    },
                                    "blocks": {
                                        "video-item": {
                                            "type": "video",
                                            "settings": {
                                                "video_alt": {
                                                    "value": "Describe the video"
                                                },
                                                "image_padding": {
                                                    "value": "cover"
                                                }
                                            }
                                        },
                                        "product": {
                                            "type": "product",
                                            "settings": {
                                                "product_hover_show_next": {
                                                    "value": false
                                                },
                                                "image_padding": {
                                                    "value": "cover"
                                                },
                                                "product_id": {
                                                    "value": ""
                                                }
                                            }
                                        },
                                        "collection": {
                                            "type": "collection",
                                            "settings": {
                                                "image_padding": {
                                                    "value": "cover"
                                                },
                                                "category_id": {
                                                    "value": ""
                                                }
                                            }
                                        }
                                    },
                                    "block_order": [
                                        "video-item",
                                        "product",
                                        "collection"
                                    ]
                                },
                                "schema": {
                                    "name": "t:sections.multi-media-splicing.name",
                                    "icon": "video",
                                    "type": "multi-media-splicing",
                                    "max_blocks": 3,
                                    "blocks": [
                                        {
                                            "type": "video",
                                            "icon": "normal",
                                            "name": "t:sections.multi-media-splicing.blocks.video.name",
                                            "settings": [
                                                {
                                                    "id": "cover_image",
                                                    "type": "image_picker",
                                                    "label": "t:sections.multi-media-splicing.blocks.video.settings.cover_image.label"
                                                },
                                                {
                                                    "id": "video_url",
                                                    "type": "video_text",
                                                    "label": "t:sections.multi-media-splicing.blocks.video.settings.video_url.label",
                                                    "format": "video",
                                                    "placeholder": "https://www.youtube.com/watch?v=V7BEzkRBp_g",
                                                    "info": "t:sections.multi-media-splicing.blocks.video.settings.video_url.info"
                                                },
                                                {
                                                    "id": "video_alt",
                                                    "type": "text",
                                                    "label": "t:sections.multi-media-splicing.blocks.video.settings.video_alt.label",
                                                    "default": "Describe the video"
                                                },
                                                {
                                                    "id": "image_padding",
                                                    "type": "select",
                                                    "label": "t:sections.multi-media-splicing.blocks.video.settings.image_padding.label",
                                                    "info": "t:sections.multi-media-splicing.blocks.video.settings.image_padding.info",
                                                    "options": [
                                                        {
                                                            "value": "cover",
                                                            "label": "t:sections.multi-media-splicing.blocks.video.settings.image_padding.options__0.label"
                                                        },
                                                        {
                                                            "value": "fit",
                                                            "label": "t:sections.multi-media-splicing.blocks.video.settings.image_padding.options__1.label"
                                                        }
                                                    ],
                                                    "default": "cover"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "product",
                                            "icon": "normal",
                                            "name": "t:sections.multi-media-splicing.blocks.product.name",
                                            "settings": [
                                                {
                                                    "type": "product_picker",
                                                    "id": "product_id",
                                                    "label": "t:sections.multi-media-splicing.blocks.product.settings.product_id.label"
                                                },
                                                {
                                                    "type": "switch",
                                                    "id": "product_hover_show_next",
                                                    "label": "t:sections.multi-media-splicing.blocks.product.settings.product_hover_show_next.label",
                                                    "default": false
                                                },
                                                {
                                                    "id": "image_padding",
                                                    "type": "select",
                                                    "label": "t:sections.multi-media-splicing.blocks.product.settings.image_padding.label",
                                                    "info": "t:sections.multi-media-splicing.blocks.product.settings.image_padding.info",
                                                    "options": [
                                                        {
                                                            "value": "cover",
                                                            "label": "t:sections.multi-media-splicing.blocks.product.settings.image_padding.options__0.label"
                                                        },
                                                        {
                                                            "value": "fit",
                                                            "label": "t:sections.multi-media-splicing.blocks.product.settings.image_padding.options__1.label"
                                                        }
                                                    ],
                                                    "default": "cover"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "collection",
                                            "icon": "normal",
                                            "name": "t:sections.multi-media-splicing.blocks.collection.name",
                                            "settings": [
                                                {
                                                    "type": "collection_picker",
                                                    "id": "category_id",
                                                    "label": "t:sections.multi-media-splicing.blocks.collection.settings.category_id.label"
                                                },
                                                {
                                                    "id": "image_padding",
                                                    "type": "select",
                                                    "label": "t:sections.multi-media-splicing.blocks.collection.settings.image_padding.label",
                                                    "info": "t:sections.multi-media-splicing.blocks.collection.settings.image_padding.info",
                                                    "options": [
                                                        {
                                                            "value": "cover",
                                                            "label": "t:sections.multi-media-splicing.blocks.collection.settings.image_padding.options__0.label"
                                                        },
                                                        {
                                                            "value": "fit",
                                                            "label": "t:sections.multi-media-splicing.blocks.collection.settings.image_padding.options__1.label"
                                                        }
                                                    ],
                                                    "default": "cover"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "image",
                                            "icon": "normal",
                                            "name": "t:sections.multi-media-splicing.blocks.image.name",
                                            "settings": [
                                                {
                                                    "type": "image_picker",
                                                    "id": "image",
                                                    "label": "t:sections.multi-media-splicing.blocks.image.settings.image.label"
                                                },
                                                {
                                                    "id": "image_padding",
                                                    "type": "select",
                                                    "label": "t:sections.multi-media-splicing.blocks.image.settings.image_padding.label",
                                                    "info": "t:sections.multi-media-splicing.blocks.image.settings.image_padding.info",
                                                    "options": [
                                                        {
                                                            "value": "cover",
                                                            "label": "t:sections.multi-media-splicing.blocks.image.settings.image_padding.options__0.label"
                                                        },
                                                        {
                                                            "value": "fit",
                                                            "label": "t:sections.multi-media-splicing.blocks.image.settings.image_padding.options__1.label"
                                                        }
                                                    ],
                                                    "default": "cover"
                                                }
                                            ]
                                        }
                                    ],
                                    "settings": [
                                        {
                                            "type": "text",
                                            "id": "title",
                                            "label": "t:sections.multi-media-splicing.settings.title.label"
                                        },
                                        {
                                            "id": "title_align",
                                            "type": "text_align",
                                            "label": "t:sections.multi-media-splicing.settings.title_align.label",
                                            "default": "center"
                                        },
                                        {
                                            "type": "select",
                                            "id": "desktop_layout",
                                            "label": "t:sections.multi-media-splicing.settings.desktop_layout.label",
                                            "default": "left",
                                            "options": [
                                                {
                                                    "value": "left",
                                                    "label": "t:sections.multi-media-splicing.settings.desktop_layout.options__0.label"
                                                },
                                                {
                                                    "value": "right",
                                                    "label": "t:sections.multi-media-splicing.settings.desktop_layout.options__1.label"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "select",
                                            "id": "mobile_layout",
                                            "label": "t:sections.multi-media-splicing.settings.mobile_layout.label",
                                            "default": "splicing",
                                            "options": [
                                                {
                                                    "value": "splicing",
                                                    "label": "t:sections.multi-media-splicing.settings.mobile_layout.options__0.label"
                                                },
                                                {
                                                    "value": "list",
                                                    "label": "t:sections.multi-media-splicing.settings.mobile_layout.options__1.label"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "select",
                                            "id": "color_scheme",
                                            "label": "t:sections.multi-media-splicing.settings.color_scheme.label",
                                            "default": "",
                                            "options": [
                                                {
                                                    "value": "",
                                                    "label": "t:sections.multi-media-splicing.settings.color_scheme.options__0.label"
                                                },
                                                {
                                                    "value": "1",
                                                    "label": "t:sections.multi-media-splicing.settings.color_scheme.options__1.label"
                                                },
                                                {
                                                    "value": "2",
                                                    "label": "t:sections.multi-media-splicing.settings.color_scheme.options__2.label"
                                                },
                                                {
                                                    "value": "3",
                                                    "label": "t:sections.multi-media-splicing.settings.color_scheme.options__3.label"
                                                }
                                            ]
                                        }
                                    ],
                                    "presets": [
                                        {
                                            "name": "t:sections.multi-media-splicing.presets.presets__0.name",
                                            "category_index": 4,
                                            "category": "t:sections.multi-media-splicing.presets.presets__0.category",
                                            "blocks": [
                                                {
                                                    "type": "video",
                                                    "settings": {
                                                        "video_alt": "Describe the video",
                                                        "image_padding": "cover"
                                                    }
                                                },
                                                {
                                                    "type": "product",
                                                    "settings": {
                                                        "product_id": "",
                                                        "product_hover_show_next": false,
                                                        "image_padding": "cover"
                                                    }
                                                },
                                                {
                                                    "type": "collection",
                                                    "settings": {
                                                        "category_id": "",
                                                        "image_padding": "cover"
                                                    }
                                                }
                                            ],
                                            "settings": {
                                                "title_align": "center",
                                                "desktop_layout": "left",
                                                "mobile_layout": "splicing",
                                                "color_scheme": ""
                                            }
                                        }
                                    ]
                                }
                            },
                            "text-columns-with-images": {
                                "sectionId": "text-columns-with-images",
                                "type": "text-columns-with-images",
                                "disabled": false,
                                "settingsData": {
                                    "disabled": false,
                                    "type": "text-columns-with-images",
                                    "settings": {
                                        "title": {
                                            "value": "Text columns with images"
                                        },
                                        "title_align": {
                                            "value": "center"
                                        },
                                        "image_width": {
                                            "value": "50%"
                                        },
                                        "image_ratio": {
                                            "value": "auto"
                                        },
                                        "text_align": {
                                            "value": "left"
                                        },
                                        "show_block_bg": {
                                            "value": false
                                        },
                                        "button_text": {
                                            "value": "Button"
                                        },
                                        "jump_link": {
                                            "value": ""
                                        },
                                        "show_touch": {
                                            "value": false
                                        },
                                        "color_scheme": {
                                            "value": "none"
                                        },
                                        "pc_cols": {
                                            "value": 3
                                        },
                                        "md_cols": {
                                            "value": 1
                                        }
                                    },
                                    "blocks": {
                                        "columns-image-1": {
                                            "type": "item",
                                            "settings": {
                                                "title": {
                                                    "value": "Example title"
                                                },
                                                "description": {
                                                    "value": "Use this section to explain a set of product features, to link to a series of pages, or to answer common questions about your products. Add images for emphasis."
                                                },
                                                "button_text": {
                                                    "value": "Optional button"
                                                },
                                                "jump_link": {
                                                    "value": ""
                                                },
                                                "image": {
                                                    "value": {}
                                                }
                                            }
                                        },
                                        "columns-image-2": {
                                            "type": "item",
                                            "settings": {
                                                "title": {
                                                    "value": "Example title"
                                                },
                                                "description": {
                                                    "value": "Use this section to explain a set of product features, to link to a series of pages, or to answer common questions about your products. Add images for emphasis."
                                                },
                                                "button_text": {
                                                    "value": "Optional button"
                                                },
                                                "jump_link": {
                                                    "value": ""
                                                },
                                                "image": {
                                                    "value": {}
                                                }
                                            }
                                        },
                                        "columns-image-3": {
                                            "type": "item",
                                            "settings": {
                                                "title": {
                                                    "value": "Example title"
                                                },
                                                "description": {
                                                    "value": "Use this section to explain a set of product features, to link to a series of pages, or to answer common questions about your products. Add images for emphasis."
                                                },
                                                "button_text": {
                                                    "value": "Optional button"
                                                },
                                                "jump_link": {
                                                    "value": ""
                                                },
                                                "image": {
                                                    "value": {}
                                                }
                                            }
                                        }
                                    },
                                    "block_order": [
                                        "columns-image-1",
                                        "columns-image-2",
                                        "columns-image-3"
                                    ]
                                },
                                "schema": {
                                    "name": "t:sections.text-columns-with-images.name",
                                    "max_blocks": 16,
                                    "settings": [
                                        {
                                            "id": "title",
                                            "type": "text",
                                            "label": "t:sections.text-columns-with-images.settings.title.label",
                                            "default": "Text columns with images"
                                        },
                                        {
                                            "id": "title_align",
                                            "type": "text_align",
                                            "label": "t:sections.text-columns-with-images.settings.title_align.label",
                                            "default": "center"
                                        },
                                        {
                                            "type": "select",
                                            "id": "image_width",
                                            "label": "t:sections.text-columns-with-images.settings.image_width.label",
                                            "options": [
                                                {
                                                    "label": "t:sections.text-columns-with-images.settings.image_width.options__0.label",
                                                    "value": "100%"
                                                },
                                                {
                                                    "label": "t:sections.text-columns-with-images.settings.image_width.options__1.label",
                                                    "value": "50%"
                                                },
                                                {
                                                    "label": "t:sections.text-columns-with-images.settings.image_width.options__2.label",
                                                    "value": "33.33%"
                                                }
                                            ],
                                            "default": "50%"
                                        },
                                        {
                                            "type": "select",
                                            "id": "image_ratio",
                                            "default": "0",
                                            "label": "t:sections.text-columns-with-images.settings.image_ratio.label",
                                            "options": [
                                                {
                                                    "value": "auto",
                                                    "label": "t:sections.text-columns-with-images.settings.image_ratio.options__0.label"
                                                },
                                                {
                                                    "value": "100%",
                                                    "label": "t:sections.text-columns-with-images.settings.image_ratio.options__1.label"
                                                },
                                                {
                                                    "value": "133.33%",
                                                    "label": "3:4"
                                                },
                                                {
                                                    "value": "circle",
                                                    "label": "t:sections.text-columns-with-images.settings.image_ratio.options__3.label"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "pc_cols",
                                            "type": "range",
                                            "label": "t:sections.text-columns-with-images.settings.pc_cols.label",
                                            "min": 1,
                                            "max": 6,
                                            "step": 1,
                                            "default": 3
                                        },
                                        {
                                            "id": "text_align",
                                            "type": "text_align",
                                            "label": "t:sections.text-columns-with-images.settings.text_align.label",
                                            "options": [
                                                {
                                                    "value": "left"
                                                },
                                                {
                                                    "value": "center"
                                                }
                                            ],
                                            "default": "left"
                                        },
                                        {
                                            "id": "show_block_bg",
                                            "type": "select",
                                            "label": "t:sections.text-columns-with-images.settings.show_block_bg.label",
                                            "options": [
                                                {
                                                    "label": "t:sections.text-columns-with-images.settings.show_block_bg.options__0.label",
                                                    "value": false
                                                },
                                                {
                                                    "label": "t:sections.text-columns-with-images.settings.show_block_bg.options__1.label",
                                                    "value": true
                                                }
                                            ]
                                        },
                                        {
                                            "id": "button_text",
                                            "type": "text",
                                            "label": "t:sections.text-columns-with-images.settings.button_text.label",
                                            "default": "Button"
                                        },
                                        {
                                            "id": "jump_link",
                                            "type": "url",
                                            "label": "t:sections.text-columns-with-images.settings.jump_link.label"
                                        },
                                        {
                                            "id": "md_cols",
                                            "type": "select",
                                            "label": "t:sections.text-columns-with-images.settings.md_cols.label",
                                            "default": 1,
                                            "options": [
                                                {
                                                    "value": 1,
                                                    "label": "t:sections.text-columns-with-images.settings.md_cols.options__0.label"
                                                },
                                                {
                                                    "value": 2,
                                                    "label": "t:sections.text-columns-with-images.settings.md_cols.options__1.label"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "show_touch",
                                            "type": "switch",
                                            "label": "t:sections.text-columns-with-images.settings.show_touch.label",
                                            "default": false
                                        },
                                        {
                                            "type": "select",
                                            "id": "color_scheme",
                                            "label": "t:sections.text-columns-with-images.settings.color_scheme.label",
                                            "default": "none",
                                            "options": [
                                                {
                                                    "value": "none",
                                                    "label": "t:sections.text-columns-with-images.settings.color_scheme.options__0.label"
                                                },
                                                {
                                                    "value": "1",
                                                    "label": "t:sections.text-columns-with-images.settings.color_scheme.options__1.label"
                                                },
                                                {
                                                    "value": "2",
                                                    "label": "t:sections.text-columns-with-images.settings.color_scheme.options__2.label"
                                                },
                                                {
                                                    "value": "3",
                                                    "label": "t:sections.text-columns-with-images.settings.color_scheme.options__3.label"
                                                }
                                            ]
                                        }
                                    ],
                                    "blocks": [
                                        {
                                            "type": "item",
                                            "icon": "normal",
                                            "name": "t:sections.text-columns-with-images.blocks.item.name",
                                            "settings": [
                                                {
                                                    "type": "image_picker",
                                                    "id": "image",
                                                    "info": "t:sections.text-columns-with-images.blocks.item.settings.image.info",
                                                    "label": "t:sections.text-columns-with-images.blocks.item.settings.image.label",
                                                    "default": ""
                                                },
                                                {
                                                    "id": "title",
                                                    "type": "text",
                                                    "label": "t:sections.text-columns-with-images.blocks.item.settings.title.label",
                                                    "default": "Example title"
                                                },
                                                {
                                                    "id": "description",
                                                    "type": "richtext",
                                                    "label": "t:sections.text-columns-with-images.blocks.item.settings.description.label",
                                                    "default": "Use this section to explain a set of product features, to link to a series of pages, or to answer common questions about your products. Add images for emphasis."
                                                },
                                                {
                                                    "id": "button_text",
                                                    "type": "text",
                                                    "label": "t:sections.text-columns-with-images.blocks.item.settings.button_text.label",
                                                    "default": "Optional button"
                                                },
                                                {
                                                    "id": "jump_link",
                                                    "type": "url",
                                                    "label": "t:sections.text-columns-with-images.blocks.item.settings.jump_link.label"
                                                }
                                            ]
                                        }
                                    ],
                                    "presets": [
                                        {
                                            "name": "t:sections.text-columns-with-images.presets.presets__0.name",
                                            "category_index": 2,
                                            "category": "t:sections.text-columns-with-images.presets.presets__0.category",
                                            "blocks": [
                                                {
                                                    "type": "item",
                                                    "name": "Title",
                                                    "settings": {
                                                        "image": {},
                                                        "title": "Example title",
                                                        "description": "Use this section to explain a set of product features, to link to a series of pages, or to answer common questions about your products. Add images for emphasis.",
                                                        "button_text": "Optional button",
                                                        "jump_link": ""
                                                    }
                                                },
                                                {
                                                    "type": "item",
                                                    "name": "Title",
                                                    "settings": {
                                                        "image": {},
                                                        "title": "Example title",
                                                        "description": "Use this section to explain a set of product features, to link to a series of pages, or to answer common questions about your products. Add images for emphasis.",
                                                        "button_text": "Optional button",
                                                        "jump_link": ""
                                                    }
                                                },
                                                {
                                                    "type": "item",
                                                    "name": "Title",
                                                    "settings": {
                                                        "image": {},
                                                        "title": "Example title",
                                                        "description": "Use this section to explain a set of product features, to link to a series of pages, or to answer common questions about your products. Add images for emphasis.",
                                                        "button_text": "Optional button",
                                                        "jump_link": ""
                                                    }
                                                }
                                            ],
                                            "settings": {
                                                "title": "Text columns with images",
                                                "title_align": "center",
                                                "image_width": "50%",
                                                "image_ratio": "auto",
                                                "text_align": "left",
                                                "show_block_bg": false,
                                                "button_text": "Button",
                                                "jump_link": "",
                                                "show_touch": false,
                                                "color_scheme": "none",
                                                "pc_cols": 3,
                                                "md_cols": 1
                                            }
                                        }
                                    ]
                                }
                            },
                            "testimonials": {
                                "sectionId": "testimonials",
                                "type": "testimonials",
                                "disabled": false,
                                "settingsData": {
                                    "disabled": false,
                                    "type": "testimonials",
                                    "settings": {
                                        "title": {
                                            "value": "Testimonials"
                                        },
                                        "title_align": {
                                            "value": "center"
                                        },
                                        "picture_radius": {
                                            "value": "rounded"
                                        },
                                        "text_size": {
                                            "value": "small"
                                        },
                                        "star_color": {
                                            "value": "#000000"
                                        },
                                        "color_scheme": {
                                            "value": ""
                                        }
                                    },
                                    "blocks": {
                                        "block1": {
                                            "type": "testimonial",
                                            "icon": "comment",
                                            "settings": {
                                                "star_num": {
                                                    "value": "4.5"
                                                },
                                                "description": {
                                                    "value": "Add customer reviews and testimonials to showcase your store's happy customers."
                                                },
                                                "author": {
                                                    "value": "Author's name"
                                                },
                                                "avatar": {
                                                    "value": {}
                                                }
                                            }
                                        },
                                        "block2": {
                                            "type": "testimonial",
                                            "icon": "comment",
                                            "settings": {
                                                "star_num": {
                                                    "value": "4.5"
                                                },
                                                "description": {
                                                    "value": "Add customer reviews and testimonials to showcase your store's happy customers."
                                                },
                                                "author": {
                                                    "value": "Author's name"
                                                },
                                                "avatar": {
                                                    "value": {}
                                                }
                                            }
                                        },
                                        "block3": {
                                            "type": "testimonial",
                                            "icon": "comment",
                                            "settings": {
                                                "star_num": {
                                                    "value": "4.5"
                                                },
                                                "description": {
                                                    "value": "Add customer reviews and testimonials to showcase your store's happy customers."
                                                },
                                                "author": {
                                                    "value": "Author's name"
                                                },
                                                "avatar": {
                                                    "value": {}
                                                }
                                            }
                                        },
                                        "block4": {
                                            "type": "testimonial",
                                            "icon": "comment",
                                            "settings": {
                                                "star_num": {
                                                    "value": "4.5"
                                                },
                                                "description": {
                                                    "value": "Add customer reviews and testimonials to showcase your store's happy customers."
                                                },
                                                "author": {
                                                    "value": "Author's name"
                                                },
                                                "avatar": {
                                                    "value": {}
                                                }
                                            }
                                        }
                                    },
                                    "block_order": [
                                        "block1",
                                        "block2",
                                        "block3"
                                    ]
                                },
                                "schema": {
                                    "name": "t:sections.testimonials.name",
                                    "type": "testimonials",
                                    "max_blocks": 20,
                                    "blocks": [
                                        {
                                            "type": "testimonial",
                                            "icon": "normal",
                                            "name": "t:sections.testimonials.blocks.testimonial.name",
                                            "settings": [
                                                {
                                                    "id": "avatar",
                                                    "type": "image_picker",
                                                    "label": "t:sections.testimonials.blocks.testimonial.settings.avatar.label"
                                                },
                                                {
                                                    "id": "star_num",
                                                    "type": "select",
                                                    "label": "t:sections.testimonials.blocks.testimonial.settings.star_num.label",
                                                    "default": "4.5",
                                                    "options": [
                                                        {
                                                            "label": "t:sections.testimonials.blocks.testimonial.settings.star_num.options__0.label",
                                                            "value": "hidden"
                                                        },
                                                        {
                                                            "label": "t:sections.testimonials.blocks.testimonial.settings.star_num.options__1.label",
                                                            "value": "4"
                                                        },
                                                        {
                                                            "label": "t:sections.testimonials.blocks.testimonial.settings.star_num.options__2.label",
                                                            "value": "4.5"
                                                        },
                                                        {
                                                            "label": "t:sections.testimonials.blocks.testimonial.settings.star_num.options__3.label",
                                                            "value": "5"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "id": "description",
                                                    "type": "richtext",
                                                    "label": "t:sections.testimonials.blocks.testimonial.settings.description.label",
                                                    "default": "Add customer reviews and testimonials to showcase your store's happy customers."
                                                },
                                                {
                                                    "id": "author",
                                                    "type": "text",
                                                    "label": "t:sections.testimonials.blocks.testimonial.settings.author.label",
                                                    "default": "Author's name"
                                                }
                                            ]
                                        }
                                    ],
                                    "settings": [
                                        {
                                            "id": "title",
                                            "type": "text",
                                            "label": "t:sections.testimonials.settings.title.label",
                                            "default": "Testimonials"
                                        },
                                        {
                                            "id": "title_align",
                                            "type": "text_align",
                                            "label": "t:sections.testimonials.settings.title_align.label",
                                            "default": "center"
                                        },
                                        {
                                            "id": "picture_radius",
                                            "type": "select",
                                            "label": "t:sections.testimonials.settings.picture_radius.label",
                                            "default": "rounded",
                                            "options": [
                                                {
                                                    "label": "t:sections.testimonials.settings.picture_radius.options__0.label",
                                                    "value": "natural"
                                                },
                                                {
                                                    "label": "t:sections.testimonials.settings.picture_radius.options__1.label",
                                                    "value": "rounded"
                                                },
                                                {
                                                    "label": "t:sections.testimonials.settings.picture_radius.options__2.label",
                                                    "value": "rounded-rect"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "text_size",
                                            "type": "select",
                                            "label": "t:sections.testimonials.settings.text_size.label",
                                            "default": "small",
                                            "options": [
                                                {
                                                    "label": "t:sections.testimonials.settings.text_size.options__0.label",
                                                    "value": "small"
                                                },
                                                {
                                                    "label": "t:sections.testimonials.settings.text_size.options__1.label",
                                                    "value": "medium"
                                                },
                                                {
                                                    "label": "t:sections.testimonials.settings.text_size.options__2.label",
                                                    "value": "large"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "star_color",
                                            "type": "color_picker",
                                            "label": "t:sections.testimonials.settings.star_color.label",
                                            "default": "#000000"
                                        },
                                        {
                                            "id": "color_scheme",
                                            "type": "select",
                                            "label": "t:sections.testimonials.settings.color_scheme.label",
                                            "default": "",
                                            "options": [
                                                {
                                                    "value": "",
                                                    "label": "t:sections.testimonials.settings.color_scheme.options__0.label"
                                                },
                                                {
                                                    "value": "1",
                                                    "label": "t:sections.testimonials.settings.color_scheme.options__1.label"
                                                },
                                                {
                                                    "value": "2",
                                                    "label": "t:sections.testimonials.settings.color_scheme.options__2.label"
                                                },
                                                {
                                                    "value": "3",
                                                    "label": "t:sections.testimonials.settings.color_scheme.options__3.label"
                                                }
                                            ]
                                        }
                                    ],
                                    "presets": [
                                        {
                                            "name": "t:sections.testimonials.presets.presets__0.name",
                                            "category_index": 7,
                                            "category": "t:sections.testimonials.presets.presets__0.category",
                                            "settings": {
                                                "title": "Testimonials",
                                                "title_align": "center",
                                                "picture_radius": "rounded",
                                                "text_size": "small",
                                                "star_color": "#000000",
                                                "color_scheme": ""
                                            },
                                            "blocks": [
                                                {
                                                    "type": "testimonial",
                                                    "settings": {
                                                        "avatar": {},
                                                        "star_num": "4.5",
                                                        "description": "Add customer reviews and testimonials to showcase your store's happy customers.",
                                                        "author": "Author's name"
                                                    }
                                                },
                                                {
                                                    "type": "testimonial",
                                                    "settings": {
                                                        "avatar": {},
                                                        "star_num": "4.5",
                                                        "description": "Add customer reviews and testimonials to showcase your store's happy customers.",
                                                        "author": "Author's name"
                                                    }
                                                },
                                                {
                                                    "type": "testimonial",
                                                    "settings": {
                                                        "avatar": {},
                                                        "star_num": "4.5",
                                                        "description": "Add customer reviews and testimonials to showcase your store's happy customers.",
                                                        "author": "Author's name"
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            "app-block-instagram": {
                                "sectionId": "app-block-instagram",
                                "type": "apps",
                                "disabled": false,
                                "settingsData": {
                                    "disabled": false,
                                    "type": "apps",
                                    "settings": {
                                        "include_margins": {
                                            "value": {
                                                "value": true
                                            }
                                        }
                                    },
                                    "blocks": {
                                        "block1": {
                                            "type": "shopline://apps/Instagram照片墙/blocks/app-block/7c8cf6f0-6f59-46db-97f0-a2ee9686ab4b",
                                            "settings": {},
                                            "is_recommendation": true
                                        }
                                    },
                                    "block_order": [
                                        "block1"
                                    ]
                                },
                                "schema": {
                                    "name": "t:sections.apps.name",
                                    "tag": "section",
                                    "class": "spaced-section",
                                    "settings": [
                                        {
                                            "type": "switch",
                                            "id": "include_margins",
                                            "label": "t:sections.apps.settings.include_margins.label",
                                            "default": true
                                        }
                                    ],
                                    "blocks": [
                                        {
                                            "type": "@app"
                                        }
                                    ],
                                    "presets": []
                                }
                            }
                        }
                    },
                    {
                        "type": "SECTION",
                        "id": "footer",
                        "config": {
                            "sectionId": "footer",
                            "type": "footer",
                            "disabled": false,
                            "settingsData": {
                                "disabled": false,
                                "type": "footer",
                                "settings": {
                                    "show_locale_selector": {
                                        "value": true
                                    },
                                    "show_country_selector": {
                                        "value": false
                                    },
                                    "show_pay_channel": {
                                        "value": {
                                            "show": false,
                                            "pay_channel_list": [
                                                {
                                                    "type": "visa",
                                                    "show": true
                                                },
                                                {
                                                    "type": "master-card",
                                                    "show": true
                                                },
                                                {
                                                    "type": "master-card2",
                                                    "show": true
                                                },
                                                {
                                                    "type": "visa-electron",
                                                    "show": true
                                                },
                                                {
                                                    "type": "jcb",
                                                    "show": true
                                                },
                                                {
                                                    "type": "american-express",
                                                    "show": true
                                                },
                                                {
                                                    "type": "diners-club",
                                                    "show": true
                                                },
                                                {
                                                    "type": "discover",
                                                    "show": true
                                                },
                                                {
                                                    "type": "paypal",
                                                    "show": true
                                                },
                                                {
                                                    "type": "union-pay",
                                                    "show": true
                                                }
                                            ]
                                        }
                                    },
                                    "show_copyright": {
                                        "value": true
                                    },
                                    "show_powered": {
                                        "value": false
                                    },
                                    "copyright_text": {
                                        "value": ""
                                    },
                                    "color_scheme_subscribe": {
                                        "value": "2"
                                    },
                                    "show_letter_subscribe": {
                                        "value": true
                                    },
                                    "subscribe_letter_title": {
                                        "value": "Subscribe today and get 10% off your first purchase"
                                    },
                                    "subscribe_letter_button_text": {
                                        "value": ""
                                    },
                                    "subscribe_letter_placeholder": {
                                        "value": "Enter your email"
                                    },
                                    "show_social_media": {
                                        "value": true
                                    },
                                    "padding_top": {
                                        "value": 40
                                    },
                                    "padding_bottom": {
                                        "value": 30
                                    },
                                    "footer_division": {
                                        "value": false
                                    }
                                },
                                "blocks": {
                                    "footer-menu1": {
                                        "type": "menu",
                                        "settings": {
                                            "title": {
                                                "value": "Menu title"
                                            },
                                            "default_fold": {
                                                "value": false
                                            },
                                            "menu": {
                                                "value": "foot",
                                                "resource": {
                                                    "id": "7118464746752053485",
                                                    "name": "Footer",
                                                    "type": 1,
                                                    "status": 1,
                                                    "nodeTree": [
                                                        {
                                                            "id": "4",
                                                            "name": {
                                                                "en": "Search",
                                                                "zh-hans-cn": "搜索页",
                                                                "default": "Search"
                                                            },
                                                            "nodeType": 8,
                                                            "pageLink": null,
                                                            "handle": null,
                                                            "openMode": 1,
                                                            "childNodes": []
                                                        }
                                                    ],
                                                    "handle": "footer"
                                                }
                                            }
                                        }
                                    },
                                    "footer-menu2": {
                                        "type": "menu",
                                        "settings": {
                                            "title": {
                                                "value": "Menu title"
                                            },
                                            "default_fold": {
                                                "value": false
                                            },
                                            "menu": {
                                                "value": "foot",
                                                "resource": {
                                                    "id": "7118464746752053485",
                                                    "name": "Footer",
                                                    "type": 1,
                                                    "status": 1,
                                                    "nodeTree": [
                                                        {
                                                            "id": "4",
                                                            "name": {
                                                                "en": "Search",
                                                                "zh-hans-cn": "搜索页",
                                                                "default": "Search"
                                                            },
                                                            "nodeType": 8,
                                                            "pageLink": null,
                                                            "handle": null,
                                                            "openMode": 1,
                                                            "childNodes": []
                                                        }
                                                    ],
                                                    "handle": "footer"
                                                }
                                            }
                                        }
                                    },
                                    "footer-custom": {
                                        "type": "custom",
                                        "settings": {
                                            "title": {
                                                "value": "Custom text"
                                            },
                                            "content": {
                                                "value": "Add your own custom text here."
                                            }
                                        }
                                    }
                                },
                                "block_order": [
                                    "footer-menu1",
                                    "footer-menu2",
                                    "footer-custom"
                                ],
                                "custom_css": []
                            },
                            "schema": {
                                "name": "t:sections.footer.name",
                                "max_blocks": 16,
                                "settings": [
                                    {
                                        "type": "select",
                                        "id": "color_scheme_subscribe",
                                        "default": "2",
                                        "label": "t:sections.footer.settings.color_scheme_subscribe.label",
                                        "options": [
                                            {
                                                "value": "none",
                                                "label": "t:sections.footer.settings.color_scheme_subscribe.options__0.label"
                                            },
                                            {
                                                "label": "t:sections.footer.settings.color_scheme_subscribe.options__1.label",
                                                "value": "1"
                                            },
                                            {
                                                "label": "t:sections.footer.settings.color_scheme_subscribe.options__2.label",
                                                "value": "2"
                                            },
                                            {
                                                "label": "t:sections.footer.settings.color_scheme_subscribe.options__3.label",
                                                "value": "3"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "group_header",
                                        "label": "t:sections.footer.settings.group_header__0.label"
                                    },
                                    {
                                        "type": "range",
                                        "id": "blocks_col",
                                        "label": "t:sections.footer.settings.blocks_col.label",
                                        "default": 4,
                                        "min": 3,
                                        "max": 5,
                                        "step": 1,
                                        "unit": "t:sections.footer.settings.blocks_col.unit"
                                    },
                                    {
                                        "type": "select",
                                        "id": "align_type",
                                        "label": "t:sections.footer.settings.align_type.label",
                                        "default": "left",
                                        "options": [
                                            {
                                                "value": "left",
                                                "label": "t:sections.footer.settings.align_type.options__0.label"
                                            },
                                            {
                                                "value": "center",
                                                "label": "t:sections.footer.settings.align_type.options__1.label"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "range",
                                        "id": "padding_top",
                                        "label": "t:sections.footer.settings.padding_top.label",
                                        "default": 40,
                                        "max": 100,
                                        "min": 0,
                                        "step": 2,
                                        "unit": "px"
                                    },
                                    {
                                        "type": "range",
                                        "id": "padding_bottom",
                                        "label": "t:sections.footer.settings.padding_bottom.label",
                                        "default": 40,
                                        "max": 100,
                                        "min": 0,
                                        "step": 2,
                                        "unit": "px"
                                    },
                                    {
                                        "type": "range",
                                        "id": "padding_left",
                                        "label": "t:sections.footer.settings.padding_left.label",
                                        "default": 30,
                                        "max": 400,
                                        "min": 10,
                                        "step": 2,
                                        "unit": "px"
                                    },
                                    {
                                        "type": "range",
                                        "id": "padding_right",
                                        "label": "t:sections.footer.settings.padding_right.label",
                                        "default": 30,
                                        "max": 400,
                                        "min": 10,
                                        "step": 2,
                                        "unit": "px"
                                    },
                                    {
                                        "type": "group_header",
                                        "label": "t:sections.footer.settings.group_header__1.label"
                                    },
                                    {
                                        "type": "switch",
                                        "id": "show_letter_subscribe",
                                        "label": "t:sections.footer.settings.show_letter_subscribe.label",
                                        "default": true
                                    },
                                    {
                                        "type": "switch",
                                        "id": "letter_pc_show_row",
                                        "label": "t:sections.footer.settings.letter_pc_show_row.label",
                                        "default": false
                                    },
                                    {
                                        "type": "select",
                                        "id": "letter_show_type",
                                        "label": "t:sections.footer.settings.letter_show_type.label",
                                        "options": [
                                            {
                                                "value": "up",
                                                "label": "t:sections.footer.settings.letter_show_type.options__0.label"
                                            },
                                            {
                                                "value": "down",
                                                "label": "t:sections.footer.settings.letter_show_type.options__1.label"
                                            }
                                        ],
                                        "default": "down"
                                    },
                                    {
                                        "type": "select",
                                        "id": "letter_show_size",
                                        "label": "t:sections.footer.settings.letter_show_size.label",
                                        "options": [
                                            {
                                                "value": "small",
                                                "label": "t:sections.footer.settings.letter_show_size.options__0.label"
                                            },
                                            {
                                                "value": "middle",
                                                "label": "t:sections.footer.settings.letter_show_size.options__1.label"
                                            },
                                            {
                                                "value": "large",
                                                "label": "t:sections.footer.settings.letter_show_size.options__2.label"
                                            }
                                        ],
                                        "default": "small"
                                    },
                                    {
                                        "type": "richtext",
                                        "id": "subscribe_letter_title",
                                        "label": "t:sections.footer.settings.subscribe_letter_title.label",
                                        "default": "Subscribe today and get 10% off your first purchase"
                                    },
                                    {
                                        "id": "subscribe_letter_button_text",
                                        "type": "text",
                                        "label": "t:sections.footer.settings.subscribe_letter_button_text.label",
                                        "default": ""
                                    },
                                    {
                                        "type": "text",
                                        "id": "subscribe_letter_placeholder",
                                        "label": "t:sections.footer.settings.subscribe_letter_placeholder.label",
                                        "default": "Enter your email"
                                    },
                                    {
                                        "type": "group_header",
                                        "label": "t:sections.footer.settings.group_header__2.label"
                                    },
                                    {
                                        "type": "switch",
                                        "id": "show_social_media",
                                        "label": "t:sections.footer.settings.show_social_media.label",
                                        "default": true
                                    },
                                    {
                                        "type": "switch",
                                        "id": "media_pc_show_row",
                                        "label": "t:sections.footer.settings.media_pc_show_row.label",
                                        "default": false
                                    },
                                    {
                                        "type": "select",
                                        "id": "media_show_type",
                                        "label": "t:sections.footer.settings.media_show_type.label",
                                        "options": [
                                            {
                                                "value": "up",
                                                "label": "t:sections.footer.settings.media_show_type.options__0.label"
                                            },
                                            {
                                                "value": "down",
                                                "label": "t:sections.footer.settings.media_show_type.options__1.label"
                                            }
                                        ],
                                        "default": "down"
                                    },
                                    {
                                        "type": "range",
                                        "id": "media_icon_width",
                                        "label": "t:sections.footer.settings.media_icon_width.label",
                                        "default": 28,
                                        "max": 88,
                                        "min": 24,
                                        "step": 1,
                                        "unit": "px"
                                    },
                                    {
                                        "type": "range",
                                        "id": "media_icon_padding",
                                        "label": "t:sections.footer.settings.media_icon_padding.label",
                                        "default": 8,
                                        "max": 40,
                                        "min": 8,
                                        "step": 1,
                                        "unit": "px"
                                    },
                                    {
                                        "type": "group_header",
                                        "label": "t:sections.footer.settings.group_header__3.label"
                                    },
                                    {
                                        "type": "select",
                                        "id": "copyright_show_type",
                                        "label": "t:sections.footer.settings.copyright_show_type.label",
                                        "options": [
                                            {
                                                "value": "flatten",
                                                "label": "t:sections.footer.settings.copyright_show_type.options__0.label"
                                            },
                                            {
                                                "value": "vertical",
                                                "label": "t:sections.footer.settings.copyright_show_type.options__1.label"
                                            }
                                        ],
                                        "default": "flatten"
                                    },
                                    {
                                        "type": "choosePaymentIcons",
                                        "id": "show_pay_channel",
                                        "label": "t:sections.footer.settings.show_pay_channel.label"
                                    },
                                    {
                                        "type": "switch",
                                        "id": "show_locale_selector",
                                        "label": "t:sections.footer.settings.show_locale_selector.label",
                                        "info": "t:sections.footer.settings.show_locale_selector.info",
                                        "default": false
                                    },
                                    {
                                        "type": "switch",
                                        "id": "show_country_selector",
                                        "label": "t:sections.footer.settings.show_country_selector.label",
                                        "info": "t:sections.footer.settings.show_country_selector.info",
                                        "default": false
                                    },
                                    {
                                        "type": "switch",
                                        "id": "show_copyright",
                                        "label": "t:sections.footer.settings.show_copyright.label",
                                        "default": true
                                    },
                                    {
                                        "type": "switch",
                                        "id": "show_powered",
                                        "label": "t:sections.footer.settings.show_powered.label",
                                        "default": false
                                    },
                                    {
                                        "type": "richtext",
                                        "id": "copyright_text",
                                        "label": "t:sections.footer.settings.copyright_text.label"
                                    },
                                    {
                                        "id": "footer_division",
                                        "type": "switch",
                                        "label": "t:sections.footer.settings.footer_division.label",
                                        "default": false
                                    },
                                    {
                                        "type": "menu_picker",
                                        "id": "copyright_menu",
                                        "label": "t:sections.footer.settings.copyright_menu.label"
                                    },
                                    {
                                        "type": "select",
                                        "id": "copyright_menu_type",
                                        "label": "t:sections.footer.settings.copyright_menu_type.label",
                                        "options": [
                                            {
                                                "value": "copyright_top",
                                                "label": "t:sections.footer.settings.copyright_menu_type.options__0.label"
                                            },
                                            {
                                                "value": "copyright_left",
                                                "label": "t:sections.footer.settings.copyright_menu_type.options__1.label"
                                            }
                                        ],
                                        "default": "copyright_top"
                                    }
                                ],
                                "blocks": [
                                    {
                                        "limit": 1,
                                        "type": "newsletter",
                                        "icon": "email",
                                        "name": "t:sections.footer.blocks.newsletter.name",
                                        "settings": [
                                            {
                                                "type": "text",
                                                "id": "title",
                                                "label": "t:sections.footer.blocks.newsletter.settings.title.label",
                                                "default": "Sign up and save"
                                            },
                                            {
                                                "type": "richtext",
                                                "id": "subscribe_letter_title",
                                                "label": "t:sections.footer.blocks.newsletter.settings.subscribe_letter_title.label",
                                                "default": "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals."
                                            }
                                        ]
                                    },
                                    {
                                        "limit": 1,
                                        "type": "social_media",
                                        "icon": "normal",
                                        "name": "t:sections.footer.blocks.social_media.name",
                                        "settings": [
                                            {
                                                "type": "text",
                                                "id": "title",
                                                "label": "t:sections.footer.blocks.social_media.settings.title.label",
                                                "default": "Follow us"
                                            },
                                            {
                                                "type": "range",
                                                "id": "block_media_icon_width",
                                                "label": "t:sections.footer.blocks.social_media.settings.block_media_icon_width.label",
                                                "default": 28,
                                                "max": 88,
                                                "min": 24,
                                                "step": 1,
                                                "unit": "px"
                                            },
                                            {
                                                "type": "range",
                                                "id": "block_media_icon_padding",
                                                "label": "t:sections.footer.blocks.social_media.settings.block_media_icon_padding.label",
                                                "default": 8,
                                                "max": 40,
                                                "min": 8,
                                                "step": 1,
                                                "unit": "px"
                                            }
                                        ]
                                    },
                                    {
                                        "type": "menu",
                                        "icon": "normal",
                                        "name": "t:sections.footer.blocks.menu.name",
                                        "settings": [
                                            {
                                                "type": "text",
                                                "id": "title",
                                                "label": "t:sections.footer.blocks.menu.settings.title.label"
                                            },
                                            {
                                                "type": "menu_picker",
                                                "id": "menu",
                                                "label": "t:sections.footer.blocks.menu.settings.menu.label",
                                                "default": "foot"
                                            },
                                            {
                                                "type": "switch",
                                                "id": "default_fold",
                                                "label": "t:sections.footer.blocks.menu.settings.default_fold.label",
                                                "default": false
                                            }
                                        ]
                                    },
                                    {
                                        "type": "custom",
                                        "icon": "paragraph",
                                        "name": "t:sections.footer.blocks.custom.name",
                                        "settings": [
                                            {
                                                "type": "text",
                                                "id": "title",
                                                "label": "t:sections.footer.blocks.custom.settings.title.label",
                                                "default": "Custom text"
                                            },
                                            {
                                                "type": "richtext",
                                                "id": "content",
                                                "label": "t:sections.footer.blocks.custom.settings.content.label",
                                                "default": "Add your own custom text here."
                                            }
                                        ]
                                    },
                                    {
                                        "type": "image",
                                        "icon": "image",
                                        "name": "t:sections.footer.blocks.image.name",
                                        "settings": [
                                            {
                                                "type": "image_picker",
                                                "id": "image",
                                                "label": "t:sections.footer.blocks.image.settings.image.label"
                                            },
                                            {
                                                "type": "url",
                                                "id": "link",
                                                "label": "t:sections.footer.blocks.image.settings.link.label"
                                            },
                                            {
                                                "id": "image_width",
                                                "type": "range",
                                                "label": "t:sections.footer.blocks.image.settings.image_width.label",
                                                "min": 50,
                                                "max": 200,
                                                "step": 10,
                                                "unit": "px",
                                                "default": 100
                                            },
                                            {
                                                "type": "select",
                                                "id": "align",
                                                "label": "t:sections.footer.blocks.image.settings.align.label",
                                                "options": [
                                                    {
                                                        "value": "left",
                                                        "label": "t:sections.footer.blocks.image.settings.align.options__0.label"
                                                    },
                                                    {
                                                        "value": "center",
                                                        "label": "t:sections.footer.blocks.image.settings.align.options__1.label"
                                                    },
                                                    {
                                                        "value": "right",
                                                        "label": "t:sections.footer.blocks.image.settings.align.options__2.label"
                                                    }
                                                ],
                                                "default": "center"
                                            }
                                        ]
                                    },
                                    {
                                        "limit": 5,
                                        "type": "conact",
                                        "icon": "image",
                                        "name": "t:sections.footer.blocks.conact.name",
                                        "settings": [
                                            {
                                                "type": "text",
                                                "id": "title",
                                                "label": "t:sections.footer.blocks.conact.settings.title.label",
                                                "default": "Contact us"
                                            },
                                            {
                                                "type": "select",
                                                "id": "conact_icon_1",
                                                "default": "address",
                                                "label": "t:sections.footer.blocks.conact.settings.conact_icon_1.label",
                                                "options": [
                                                    {
                                                        "value": "address",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_1.options__0.label"
                                                    },
                                                    {
                                                        "value": "tel",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_1.options__1.label"
                                                    },
                                                    {
                                                        "value": "phone",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_1.options__2.label"
                                                    },
                                                    {
                                                        "value": "wechat",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_1.options__3.label"
                                                    },
                                                    {
                                                        "value": "email",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_1.options__4.label"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "text",
                                                "id": "conact_text_1",
                                                "label": "t:sections.footer.blocks.conact.settings.conact_text_1.label",
                                                "default": "235 Fake St. London, UK"
                                            },
                                            {
                                                "type": "select",
                                                "id": "conact_icon_2",
                                                "default": "tel",
                                                "label": "t:sections.footer.blocks.conact.settings.conact_icon_2.label",
                                                "options": [
                                                    {
                                                        "value": "address",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_2.options__0.label"
                                                    },
                                                    {
                                                        "value": "tel",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_2.options__1.label"
                                                    },
                                                    {
                                                        "value": "phone",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_2.options__2.label"
                                                    },
                                                    {
                                                        "value": "wechat",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_2.options__3.label"
                                                    },
                                                    {
                                                        "value": "email",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_2.options__4.label"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "text",
                                                "id": "conact_text_2",
                                                "label": "t:sections.footer.blocks.conact.settings.conact_text_2.label",
                                                "default": "+44 020 34473471"
                                            },
                                            {
                                                "type": "select",
                                                "id": "conact_icon_3",
                                                "default": "email",
                                                "label": "t:sections.footer.blocks.conact.settings.conact_icon_3.label",
                                                "options": [
                                                    {
                                                        "value": "address",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_3.options__0.label"
                                                    },
                                                    {
                                                        "value": "tel",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_3.options__1.label"
                                                    },
                                                    {
                                                        "value": "phone",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_3.options__2.label"
                                                    },
                                                    {
                                                        "value": "wechat",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_3.options__3.label"
                                                    },
                                                    {
                                                        "value": "email",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_3.options__4.label"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "text",
                                                "id": "conact_text_3",
                                                "label": "t:sections.footer.blocks.conact.settings.conact_text_3.label",
                                                "default": "info@chanrolapparel.com"
                                            },
                                            {
                                                "type": "select",
                                                "id": "conact_icon_4",
                                                "default": "",
                                                "label": "t:sections.footer.blocks.conact.settings.conact_icon_4.label",
                                                "options": [
                                                    {
                                                        "value": "address",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_4.options__0.label"
                                                    },
                                                    {
                                                        "value": "tel",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_4.options__1.label"
                                                    },
                                                    {
                                                        "value": "phone",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_4.options__2.label"
                                                    },
                                                    {
                                                        "value": "wechat",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_4.options__3.label"
                                                    },
                                                    {
                                                        "value": "email",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_4.options__4.label"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "text",
                                                "id": "conact_text_4",
                                                "label": "t:sections.footer.blocks.conact.settings.conact_text_4.label",
                                                "default": ""
                                            },
                                            {
                                                "type": "select",
                                                "id": "conact_icon_5",
                                                "default": "",
                                                "label": "t:sections.footer.blocks.conact.settings.conact_icon_5.label",
                                                "options": [
                                                    {
                                                        "value": "address",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_5.options__0.label"
                                                    },
                                                    {
                                                        "value": "tel",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_5.options__1.label"
                                                    },
                                                    {
                                                        "value": "phone",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_5.options__2.label"
                                                    },
                                                    {
                                                        "value": "wechat",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_5.options__3.label"
                                                    },
                                                    {
                                                        "value": "email",
                                                        "label": "t:sections.footer.blocks.conact.settings.conact_icon_5.options__4.label"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "text",
                                                "id": "conact_text_5",
                                                "label": "t:sections.footer.blocks.conact.settings.conact_text_5.label",
                                                "default": ""
                                            },
                                            {
                                                "type": "switch",
                                                "id": "default_fold",
                                                "label": "t:sections.footer.blocks.conact.settings.default_fold.label",
                                                "default": false
                                            }
                                        ]
                                    },
                                    {
                                        "limit": 5,
                                        "type": "logo_list",
                                        "icon": "image",
                                        "name": "t:sections.footer.blocks.logo_list.name",
                                        "settings": [
                                            {
                                                "type": "text",
                                                "id": "title",
                                                "label": "t:sections.footer.blocks.logo_list.settings.title.label",
                                                "default": "Service"
                                            },
                                            {
                                                "type": "select",
                                                "id": "icon_1",
                                                "default": "van",
                                                "label": "t:sections.footer.blocks.logo_list.settings.icon_1.label",
                                                "options": [
                                                    {
                                                        "value": "checkbox",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_1.options__0.label"
                                                    },
                                                    {
                                                        "value": "earth",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_1.options__1.label"
                                                    },
                                                    {
                                                        "value": "green",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_1.options__2.label"
                                                    },
                                                    {
                                                        "value": "package",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_1.options__3.label"
                                                    },
                                                    {
                                                        "value": "safe",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_1.options__4.label"
                                                    },
                                                    {
                                                        "value": "van",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_1.options__5.label"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "image_picker",
                                                "id": "image_1",
                                                "label": "t:sections.footer.blocks.logo_list.settings.image_1.label"
                                            },
                                            {
                                                "type": "richtext",
                                                "id": "text_1",
                                                "label": "t:sections.footer.blocks.logo_list.settings.text_1.label",
                                                "default": "Fast and free delivery"
                                            },
                                            {
                                                "type": "select",
                                                "id": "icon_2",
                                                "default": "package",
                                                "label": "t:sections.footer.blocks.logo_list.settings.icon_2.label",
                                                "options": [
                                                    {
                                                        "value": "checkbox",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_2.options__0.label"
                                                    },
                                                    {
                                                        "value": "earth",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_2.options__1.label"
                                                    },
                                                    {
                                                        "value": "green",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_2.options__2.label"
                                                    },
                                                    {
                                                        "value": "package",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_2.options__3.label"
                                                    },
                                                    {
                                                        "value": "safe",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_2.options__4.label"
                                                    },
                                                    {
                                                        "value": "van",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_2.options__5.label"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "image_picker",
                                                "id": "image_2",
                                                "label": "t:sections.footer.blocks.logo_list.settings.image_2.label"
                                            },
                                            {
                                                "type": "richtext",
                                                "id": "text_2",
                                                "label": "t:sections.footer.blocks.logo_list.settings.text_2.label",
                                                "default": "30 day refund guarantee"
                                            },
                                            {
                                                "type": "select",
                                                "id": "icon_3",
                                                "default": "safe",
                                                "label": "t:sections.footer.blocks.logo_list.settings.icon_3.label",
                                                "options": [
                                                    {
                                                        "value": "checkbox",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_3.options__0.label"
                                                    },
                                                    {
                                                        "value": "earth",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_3.options__1.label"
                                                    },
                                                    {
                                                        "value": "green",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_3.options__2.label"
                                                    },
                                                    {
                                                        "value": "package",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_3.options__3.label"
                                                    },
                                                    {
                                                        "value": "safe",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_3.options__4.label"
                                                    },
                                                    {
                                                        "value": "van",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_3.options__5.label"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "image_picker",
                                                "id": "image_3",
                                                "label": "t:sections.footer.blocks.logo_list.settings.image_3.label"
                                            },
                                            {
                                                "type": "richtext",
                                                "id": "text_3",
                                                "label": "t:sections.footer.blocks.logo_list.settings.text_3.label",
                                                "default": "Worry free guarantee"
                                            },
                                            {
                                                "type": "select",
                                                "id": "icon_4",
                                                "default": "checkbox",
                                                "label": "t:sections.footer.blocks.logo_list.settings.icon_4.label",
                                                "options": [
                                                    {
                                                        "value": "checkbox",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_4.options__0.label"
                                                    },
                                                    {
                                                        "value": "earth",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_4.options__1.label"
                                                    },
                                                    {
                                                        "value": "green",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_4.options__2.label"
                                                    },
                                                    {
                                                        "value": "package",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_4.options__3.label"
                                                    },
                                                    {
                                                        "value": "safe",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_4.options__4.label"
                                                    },
                                                    {
                                                        "value": "van",
                                                        "label": "t:sections.footer.blocks.logo_list.settings.icon_4.options__5.label"
                                                    }
                                                ]
                                            },
                                            {
                                                "type": "image_picker",
                                                "id": "image_4",
                                                "label": "t:sections.footer.blocks.logo_list.settings.image_4.label"
                                            },
                                            {
                                                "type": "richtext",
                                                "id": "text_4",
                                                "label": "t:sections.footer.blocks.logo_list.settings.text_4.label",
                                                "default": "Lifetime customer support"
                                            },
                                            {
                                                "type": "switch",
                                                "id": "default_fold",
                                                "label": "t:sections.footer.blocks.logo_list.settings.default_fold.label",
                                                "default": false
                                            }
                                        ]
                                    }
                                ],
                                "default": {
                                    "blocks": [
                                        {
                                            "type": "menu",
                                            "settings": {
                                                "menu": "foot",
                                                "default_fold": false,
                                                "title": "Menu title"
                                            }
                                        },
                                        {
                                            "type": "custom",
                                            "settings": {
                                                "title": "Custom text",
                                                "content": "Add your own custom text here."
                                            }
                                        },
                                        {
                                            "type": "image",
                                            "settings": {
                                                "image": {}
                                            }
                                        }
                                    ],
                                    "settings": {
                                        "show_locale_selector": false,
                                        "blocks_col": 4,
                                        "align_type": "left",
                                        "padding_left": 30,
                                        "padding_right": 30,
                                        "padding_top": 40,
                                        "padding_bottom": 40,
                                        "letter_show_type": "down",
                                        "media_show_type": "down",
                                        "letter_pc_show_row": false,
                                        "media_pc_show_row": false,
                                        "show_pay_channel": {
                                            "show": false,
                                            "pay_channel_list": [
                                                {
                                                    "type": "visa",
                                                    "show": true
                                                },
                                                {
                                                    "type": "master-card",
                                                    "show": true
                                                },
                                                {
                                                    "type": "master-card2",
                                                    "show": true
                                                },
                                                {
                                                    "type": "visa-electron",
                                                    "show": true
                                                },
                                                {
                                                    "type": "jcb",
                                                    "show": true
                                                },
                                                {
                                                    "type": "american-express",
                                                    "show": true
                                                },
                                                {
                                                    "type": "diners-club",
                                                    "show": true
                                                },
                                                {
                                                    "type": "discover",
                                                    "show": true
                                                },
                                                {
                                                    "type": "paypal",
                                                    "show": true
                                                },
                                                {
                                                    "type": "union-pay",
                                                    "show": true
                                                }
                                            ]
                                        },
                                        "show_copyright": true,
                                        "show_powered": false,
                                        "copyright_text": "",
                                        "color_scheme_subscribe": "2",
                                        "show_letter_subscribe": true,
                                        "subscribe_letter_title": "Subscribe today and get 10% off your first purchase",
                                        "subscribe_letter_button_text": "",
                                        "subscribe_letter_placeholder": "Enter your email",
                                        "show_social_media": true
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        })
    },
    'POST /api/ApiEditor/settings':(req: Request, res: Response) => {
        res.json({
            "code": "SUCCESS",
            "msg": "success",
            "data":{
                schema: [],
                settingsData:{},
                presets:{}
            }
        })
    },
    
    'POST /api/ApiEditor/languageSchema':(req: Request, res: Response) => {
        res.json({
            "code": "SUCCESS",
            "msg": "success",
            "data":{
                schema: {},
            }
        })
    },

    'POST /api/ApiEditor/template_info':(req: Request, res: Response) => {
        res.json({
            "code": 0,
            "msg": "success",
            "data":{
                
            }
        })
    },
    // 
    'POST /api/ApiEditor/page': (req: Request, res: Response) => {
        res.json({
            "code": 0,
            "msg": "ok",
            "success": true,
            "data": {
                "list": [
                    {
                        "id": "Home",
                        "name": "templates\/index.json",
                        "title": "Home",
                        "template": {
                            "directory": null,
                            "name": "Home",
                            "suffix": null
                        }
                    },
                    {
                        "id": "AllCollections",
                        "name": "templates\/collections_all.json",
                        "title": "Collections list",
                        "template": {
                            "directory": null,
                            "name": "AllCollections",
                            "suffix": null
                        }
                    },
                    {
                        "id": "Products",
                        "name": "templates\/collection.json",
                        "title": "Products",
                        "template": {
                            "directory": null,
                            "name": "Products",
                            "suffix": null
                        }
                    },
                    {
                        "id": "ProductsDetail",
                        "name": "templates\/products\/detail.json",
                        "title": "ProductsDetail",
                        "template": {
                            "directory": "products",
                            "name": "ProductsDetail",
                            "suffix": null
                        }
                    },
                    {
                        "id": "Cart",
                        "name": "templates\/cart.json",
                        "title": "Cart",
                        "template": {
                            "directory": null,
                            "name": "Cart",
                            "suffix": null
                        }
                    },
                    {
                        "id": "BlogsList",
                        "name": "templates\/blogs\/list.json",
                        "title": "Blogs",
                        "template": {
                            "directory": "blogs",
                            "name": "BlogsList",
                            "suffix": null
                        }
                    },
                    {
                        "id": "BlogsDetail",
                        "name": "templates\/blogs\/detail.json",
                        "title": "Blog",
                        "template": {
                            "directory": "blogs",
                            "name": "BlogsDetail",
                            "suffix": null
                        }
                    },
                    {
                        "id": "Checkout",
                        "name": "templates\/trade\/checkout.html",
                        "title": "Checkout",
                        "template": {
                            "directory": "trade",
                            "name": "Checkout",
                            "suffix": null
                        }
                    },
                    {
                        "id": "404",
                        "name": "templates\/404.json",
                        "title": "404 page",
                        "template": {
                            "directory": null,
                            "name": "404",
                            "suffix": null
                        }
                    },
                    {
                        "id": "ProductsSearch",
                        "name": "templates\/products\/search.json",
                        "title": "ProductsSearch",
                        "template": {
                            "directory": "products",
                            "name": "ProductsSearch",
                            "suffix": null
                        }
                    },
                    {
                        "id": "SignIn",
                        "name": "templates\/customers\/login.html",
                        "title": "Login",
                        "template": {
                            "directory": "customers",
                            "name": "SignIn",
                            "suffix": null
                        }
                    },
                    {
                        "id": "SignUp",
                        "name": "templates\/customers\/register.html",
                        "title": "Register",
                        "template": {
                            "directory": "customers",
                            "name": "SignUp",
                            "suffix": null
                        }
                    },
                    {
                        "id": "Company",
                        "name": "templates\/customers\/company.html",
                        "title": "Company account register",
                        "template": {
                            "directory": "customers",
                            "name": "Company",
                            "suffix": null
                        }
                    },
                    {
                        "id": "ActivateAccount",
                        "name": "templates\/customers\/activate_account.html",
                        "title": "ActivateAccount",
                        "template": {
                            "directory": "customers",
                            "name": "ActivateAccount",
                            "suffix": null
                        }
                    },
                    {
                        "id": "Password",
                        "name": "templates\/password.json",
                        "title": "Password",
                        "template": {
                            "directory": null,
                            "name": "Password",
                            "suffix": null
                        }
                    },
                    {
                        "id": "Center",
                        "name": "templates\/customers\/account.html",
                        "title": "Center",
                        "template": {
                            "directory": "customers",
                            "name": "Center",
                            "suffix": null
                        }
                    },
                    {
                        "id": "AddressNew",
                        "name": "templates\/customers\/addresses.html",
                        "title": "Address",
                        "template": {
                            "directory": "customers",
                            "name": "AddressNew",
                            "suffix": null
                        }
                    },
                    {
                        "id": "AddressEdit",
                        "name": "templates\/customers\/addresses.html",
                        "title": "Address",
                        "template": {
                            "directory": "customers",
                            "name": "AddressEdit",
                            "suffix": null
                        }
                    },
                    {
                        "id": "OrderList",
                        "name": "templates\/customers\/order\/list.html",
                        "title": "customers\/orders",
                        "template": {
                            "directory": "customers\/order",
                            "name": "OrderList",
                            "suffix": null
                        }
                    },
                    {
                        "id": "OrderDetail",
                        "name": "templates\/customers\/order\/detail.html",
                        "title": "customers\/orders",
                        "template": {
                            "directory": "customers\/order",
                            "name": "OrderDetail",
                            "suffix": null
                        }
                    },
                    {
                        "id": "PasswordNew",
                        "name": "templates\/customers\/forgot_password.html",
                        "title": "customers\/forgot_password",
                        "template": {
                            "directory": "customers",
                            "name": "PasswordNew",
                            "suffix": null
                        }
                    },
                    {
                        "id": "Page",
                        "name": "templates\/page.json",
                        "title": "custom",
                        "template": {
                            "directory": null,
                            "name": "Page",
                            "suffix": null
                        }
                    },
                    {
                        "id": "Policy",
                        "name": "templates\/policy.html",
                        "title": "Policy",
                        "template": {
                            "directory": null,
                            "name": "Policy",
                            "suffix": null
                        }
                    }
                ]
            }
        })
    }
    
}
