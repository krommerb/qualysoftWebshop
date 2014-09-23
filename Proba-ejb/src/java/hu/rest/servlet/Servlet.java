/*
 * Lyndás tutorialos Eclipse-projektből próbaképp átemelve, nincs rá szükség a feladathoz
 */

package hu.rest.servlet;

/**
 *
 * @author krommerb
 */

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * Servlet implementation class Servlet
 */
@WebServlet(description = "This is a sample servlet", urlPatterns = { "/Servlet" })
public class Servlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//System.out.println("Test");
		
	request.setCharacterEncoding("UTF-8");
//	response.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
	 PrintWriter w = response.getWriter();
	 w.println("<h1>Keresés:</h1>");
	 
	 String s = request.getParameter("search");
	 w.println(s);
	 
	 
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		//super.doPost(req, resp);
		
                resp.setContentType("text/html;charset=UTF-8");
             
		
                PrintWriter w = resp.getWriter();
              
		w.println("<h1>POST-űrlap kiértékelése:</h1>");
                 //String s = req.getParameter("search");
		 //w.println(s);
		 
		 Map<String, String[]> params;
		 params = req.getParameterMap();
		 Set<String> keys = params.keySet();
		// Iterator i = keys.iterator();
		
//		 while (i.hasNext()){
//			
//			 String next = (String) i.next();
//			 String p[] = params.get(next);
//			 System.out.println("Kulcs: " + next + " Érték: "+p[0]);
//			 
//		 } 
		 
		 for (String key:keys){
			 
                     w.println("<span>"+key+"</span>");
                     w.println("<span>"+params.get(key)[0]+"</span>");
                     
		 }
		 
		
	   
	    
	   
	}
	
	

}
