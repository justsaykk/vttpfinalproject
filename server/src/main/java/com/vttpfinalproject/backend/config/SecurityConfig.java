// package com.vttpfinalproject.backend.config;

// import java.io.IOException;
// import java.util.Collections;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.AuthenticationException;
// import org.springframework.security.web.SecurityFilterChain;
// import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

// import com.fasterxml.jackson.core.JsonProcessingException;
// import com.fasterxml.jackson.databind.ObjectMapper;

// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// @Configuration @EnableWebSecurity
// public class SecurityConfig {

//     private ObjectMapper mapper;
//     private TokenStore tokenStore;
//     private TokenFilter tokenFilter;

//     public SecurityConfig(ObjectMapper mapper, TokenStore tokenStore, TokenFilter tokenFilter) {
//         this.mapper = mapper;
//         this.tokenStore = tokenStore;
//         this.tokenFilter = tokenFilter;
//     }

//     @Bean
//     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//             http.csrf().disable().cors().and().authorizeHttpRequests().requestMatchers("/oauth2/**", "/login**").permitAll().anyRequest().authenticated()
//             .and()    
//                 .oauth2Login()
//                 .authorizationEndpoint()
//                 .authorizationRequestRepository(new InMemoryRequestRepository())
//             .and()
//                 .successHandler(this::successHandler)
//             .and()
//                 .exceptionHandling()
//                 .authenticationEntryPoint(this::authenticationEntryPoint)
//             .and()
//                 .logout().logoutUrl("/logout").logoutSuccessUrl("/")
//                 .invalidateHttpSession(true).deleteCookies("JSESSIONID");

//             http.addFilterBefore(tokenFilter, UsernamePasswordAuthenticationFilter.class);
//             return http.build();
//     }

//     @Bean
//     public CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration config = new CorsConfiguration();
//         config.setAllowedMethods(Collections.singletonList("*"));
//         config.setAllowedOrigins(Collections.singletonList("*"));
//         config.setAllowedHeaders(Collections.singletonList("*"));

//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", config);
//         return source;
//     }

//     private void successHandler( HttpServletRequest request, HttpServletResponse response, Authentication authentication ) throws JsonProcessingException, IOException { 
//         String token = tokenStore.generateToken(authentication);

//         response.getWriter().write(mapper.writeValueAsString(
//             Collections.singletonMap("accessToken",token)
//         ));
//     }


//     private void authenticationEntryPoint(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) 
//         throws JsonProcessingException, IOException { 
//         response.setStatus(401);
//         response.getWriter().write(mapper.writeValueAsString(Collections.singletonMap("error", "unauthenticated")));
//      }
// }
