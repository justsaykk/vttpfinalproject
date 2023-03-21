// package com.vttpfinalproject.backend.config;

// import java.io.IOException;

// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// @Component
// public class TokenFilter extends OncePerRequestFilter{

//     private TokenStore tokenStore;

//     public TokenFilter( TokenStore tokenStore ) {
//         this.tokenStore = tokenStore;
//     }

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//             throws ServletException, IOException {
//         String authToken = request.getHeader("Authorization");

//         if (null != authToken) {
//             String token = authToken.split(" ")[1];
//             Authentication authentication = tokenStore.getAuth(token);
//             if (null != authentication) {
//                 SecurityContextHolder.getContext().setAuthentication(authentication);
//             }
//         }

//         filterChain.doFilter(request, response);
//     }
// }
