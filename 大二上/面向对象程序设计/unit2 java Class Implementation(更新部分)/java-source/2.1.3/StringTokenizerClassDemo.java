import java.util.*;

public class StringTokenizerClassDemo {

	public static void main(String[] args) {

		//�ַ������û�Ҫ�����Ϊ��������ʾ��
		String str = "This string has five tokens";
		StringTokenizer tokenizer = new StringTokenizer(str);

		int i = 1;
		
		  for (;i<tokenizer.countTokens();i++) { System.out.println("Token #" +
		  i + ": " + tokenizer.nextToken()); }
		 
		 /*
		while (tokenizer.hasMoreTokens()) {
			System.out.println("Token #" + i + ":  " + tokenizer.nextToken());
			++i;
		}	
		*/	
	}
}