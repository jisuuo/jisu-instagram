'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">jisu-instagram documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-16b91b77651bb2024f8e7fdf1c7cd977822311d0b1abb07b3bead437e63790aad3d396c217d5b73bd88e02283866e00f7fb6718c2fad5f24c91003bcad555924"' : 'data-bs-target="#xs-controllers-links-module-AppModule-16b91b77651bb2024f8e7fdf1c7cd977822311d0b1abb07b3bead437e63790aad3d396c217d5b73bd88e02283866e00f7fb6718c2fad5f24c91003bcad555924"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-16b91b77651bb2024f8e7fdf1c7cd977822311d0b1abb07b3bead437e63790aad3d396c217d5b73bd88e02283866e00f7fb6718c2fad5f24c91003bcad555924"' :
                                            'id="xs-controllers-links-module-AppModule-16b91b77651bb2024f8e7fdf1c7cd977822311d0b1abb07b3bead437e63790aad3d396c217d5b73bd88e02283866e00f7fb6718c2fad5f24c91003bcad555924"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-16b91b77651bb2024f8e7fdf1c7cd977822311d0b1abb07b3bead437e63790aad3d396c217d5b73bd88e02283866e00f7fb6718c2fad5f24c91003bcad555924"' : 'data-bs-target="#xs-injectables-links-module-AppModule-16b91b77651bb2024f8e7fdf1c7cd977822311d0b1abb07b3bead437e63790aad3d396c217d5b73bd88e02283866e00f7fb6718c2fad5f24c91003bcad555924"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-16b91b77651bb2024f8e7fdf1c7cd977822311d0b1abb07b3bead437e63790aad3d396c217d5b73bd88e02283866e00f7fb6718c2fad5f24c91003bcad555924"' :
                                        'id="xs-injectables-links-module-AppModule-16b91b77651bb2024f8e7fdf1c7cd977822311d0b1abb07b3bead437e63790aad3d396c217d5b73bd88e02283866e00f7fb6718c2fad5f24c91003bcad555924"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-8e44bea7850689762bf01d2927a439bc8eb7e2f3b182b93c71d5b0ca903990615d35afdfb17f1e3bac166f7a450dc350663f9b7d4f37bae12daf11f2d8c4adf3"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-8e44bea7850689762bf01d2927a439bc8eb7e2f3b182b93c71d5b0ca903990615d35afdfb17f1e3bac166f7a450dc350663f9b7d4f37bae12daf11f2d8c4adf3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-8e44bea7850689762bf01d2927a439bc8eb7e2f3b182b93c71d5b0ca903990615d35afdfb17f1e3bac166f7a450dc350663f9b7d4f37bae12daf11f2d8c4adf3"' :
                                            'id="xs-controllers-links-module-AuthModule-8e44bea7850689762bf01d2927a439bc8eb7e2f3b182b93c71d5b0ca903990615d35afdfb17f1e3bac166f7a450dc350663f9b7d4f37bae12daf11f2d8c4adf3"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-8e44bea7850689762bf01d2927a439bc8eb7e2f3b182b93c71d5b0ca903990615d35afdfb17f1e3bac166f7a450dc350663f9b7d4f37bae12daf11f2d8c4adf3"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-8e44bea7850689762bf01d2927a439bc8eb7e2f3b182b93c71d5b0ca903990615d35afdfb17f1e3bac166f7a450dc350663f9b7d4f37bae12daf11f2d8c4adf3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-8e44bea7850689762bf01d2927a439bc8eb7e2f3b182b93c71d5b0ca903990615d35afdfb17f1e3bac166f7a450dc350663f9b7d4f37bae12daf11f2d8c4adf3"' :
                                        'id="xs-injectables-links-module-AuthModule-8e44bea7850689762bf01d2927a439bc8eb7e2f3b182b93c71d5b0ca903990615d35afdfb17f1e3bac166f7a450dc350663f9b7d4f37bae12daf11f2d8c4adf3"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GoogleUserStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GoogleUserStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalUserStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalUserStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/NaverUserStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NaverUserStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/DatabaseModule.html" data-type="entity-link" >DatabaseModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/EmailModule.html" data-type="entity-link" >EmailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-EmailModule-71a16f516613b8d0ede4ecc3283a4fca14ea6e65c8f734cc227e62042a4b64d469e67696bc696c6f6bca579b65d60db55a59ed5fba63a9f3c0e5a70c871c6b33"' : 'data-bs-target="#xs-injectables-links-module-EmailModule-71a16f516613b8d0ede4ecc3283a4fca14ea6e65c8f734cc227e62042a4b64d469e67696bc696c6f6bca579b65d60db55a59ed5fba63a9f3c0e5a70c871c6b33"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-EmailModule-71a16f516613b8d0ede4ecc3283a4fca14ea6e65c8f734cc227e62042a4b64d469e67696bc696c6f6bca579b65d60db55a59ed5fba63a9f3c0e5a70c871c6b33"' :
                                        'id="xs-injectables-links-module-EmailModule-71a16f516613b8d0ede4ecc3283a4fca14ea6e65c8f734cc227e62042a4b64d469e67696bc696c6f6bca579b65d60db55a59ed5fba63a9f3c0e5a70c871c6b33"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RedisModule.html" data-type="entity-link" >RedisModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UserModule-2df1d41642481bc263e29f50b861fd6a780933116e0b9abd74aec2896369ab71309df58870752a5fc641acdb2534866a67e9db304d8536512ba13829b27fc2ee"' : 'data-bs-target="#xs-controllers-links-module-UserModule-2df1d41642481bc263e29f50b861fd6a780933116e0b9abd74aec2896369ab71309df58870752a5fc641acdb2534866a67e9db304d8536512ba13829b27fc2ee"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-2df1d41642481bc263e29f50b861fd6a780933116e0b9abd74aec2896369ab71309df58870752a5fc641acdb2534866a67e9db304d8536512ba13829b27fc2ee"' :
                                            'id="xs-controllers-links-module-UserModule-2df1d41642481bc263e29f50b861fd6a780933116e0b9abd74aec2896369ab71309df58870752a5fc641acdb2534866a67e9db304d8536512ba13829b27fc2ee"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-2df1d41642481bc263e29f50b861fd6a780933116e0b9abd74aec2896369ab71309df58870752a5fc641acdb2534866a67e9db304d8536512ba13829b27fc2ee"' : 'data-bs-target="#xs-injectables-links-module-UserModule-2df1d41642481bc263e29f50b861fd6a780933116e0b9abd74aec2896369ab71309df58870752a5fc641acdb2534866a67e9db304d8536512ba13829b27fc2ee"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-2df1d41642481bc263e29f50b861fd6a780933116e0b9abd74aec2896369ab71309df58870752a5fc641acdb2534866a67e9db304d8536512ba13829b27fc2ee"' :
                                        'id="xs-injectables-links-module-UserModule-2df1d41642481bc263e29f50b861fd6a780933116e0b9abd74aec2896369ab71309df58870752a5fc641acdb2534866a67e9db304d8536512ba13829b27fc2ee"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Auth.html" data-type="entity-link" >Auth</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseAPIDocument.html" data-type="entity-link" >BaseAPIDocument</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChangePasswordDto.html" data-type="entity-link" >ChangePasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAuthDto.html" data-type="entity-link" >CreateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSocialUserDto.html" data-type="entity-link" >CreateSocialUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUserDto.html" data-type="entity-link" >LoginUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateAuthDto.html" data-type="entity-link" >UpdateAuthDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GoogleUserGuard.html" data-type="entity-link" >GoogleUserGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalUserGuard.html" data-type="entity-link" >LocalUserGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NaverUserGuard.html" data-type="entity-link" >NaverUserGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PasswordPipe.html" data-type="entity-link" >PasswordPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RefreshTokenGuard.html" data-type="entity-link" >RefreshTokenGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/BasicTokenGuard.html" data-type="entity-link" >BasicTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/BearerTokenGuard.html" data-type="entity-link" >BearerTokenGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/RequestUser.html" data-type="entity-link" >RequestUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TokenPayloadInterface.html" data-type="entity-link" >TokenPayloadInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/VerifyPayloadInterface.html" data-type="entity-link" >VerifyPayloadInterface</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});