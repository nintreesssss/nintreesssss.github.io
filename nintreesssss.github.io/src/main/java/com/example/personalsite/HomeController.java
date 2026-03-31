package com.example.personalsite;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller
public class HomeController {

    @GetMapping("/")

    public String index(Model model) {
        model.addAttribute("name","nintrees");
        model.addAttribute("bio","MUST CS本科在读");
        model.addAttribute("github", "https://github.com/nintreesssss");
        model.addAttribute("x", "https://twitter.com/nintrees"); 
        model.addAttribute("email", "nintreesssss@gmail.com");

        return "index"; //渲染src/main/resources/templates/index.html
    }

    @GetMapping(value = "/", headers = "HX-Request=true")  // 只在 HTMX 请求时匹配
    public String homeFragment() {
        return "fragments/home :: content";
    }

    @GetMapping(value = "/about", headers = "HX-Request=true")
    public String about(){
        return "fragments/about :: content";
    }

    @GetMapping(value = "/skills", headers = "HX-Request=true")
    public String skills() {
        return "fragments/skills :: content";
    }

    @GetMapping(value = "/projects", headers = "HX-Request=true")
    public String projects() {
        return "fragments/projects :: content";
    }

    @GetMapping(value = "/experience", headers = "HX-Request=true")
    public String experience() {
        return "fragments/experience :: content";
    }
    
    @GetMapping(value = "/education", headers = "HX-Request=true")
    public String education() {
        return "fragments/education :: content";
    }

    @GetMapping(value = "/contact", headers = "HX-Request=true")
    public String contact() {
        return "fragments/contact :: content";
    }
}