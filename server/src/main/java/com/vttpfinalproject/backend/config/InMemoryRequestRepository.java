// package com.vttpfinalproject.backend.config;

// import java.util.HashMap;
// import java.util.Map;

// import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
// import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;

// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;

// public class InMemoryRequestRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest>{

//     private final Map<String, OAuth2AuthorizationRequest> cache = new HashMap<>();

//     @Override
//     public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
//         String state = request.getParameter("state");
//         if (null != state) {
//             return removeAuthorizationRequest(request, null);
//         }
//         return null;
//     }

//     @Override
//     public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request,
//             HttpServletResponse response) {
//         String state = request.getParameter("state");
//         if (null != state) 
//             cache.remove(state);
            
//         return null;
//     }

//     @Override
//     public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request,
//             HttpServletResponse response) {
//             String state = authorizationRequest.getState();
//             cache.put(state, authorizationRequest);
//     }
// }
