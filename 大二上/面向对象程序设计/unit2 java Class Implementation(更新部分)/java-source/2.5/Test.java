
import java.util.*;
public class Test {	
	public static void main(String[] args){
		
		ArrayList<String>  list= new ArrayList<String>();
		list.add("Vectors");
		list.add(" and ");
		list.add("Iterators");			
	
	    String result = "";
	Iterator<String>  iterator = list.iterator() ;
	while (iterator.hasNext()) {
      	result =  iterator.next(); 
		iterator.remove();//����
		list.add("cat"); //������
		}
	System.out.println(result);
}
}

