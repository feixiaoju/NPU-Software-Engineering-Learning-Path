import java.io.*;

/**
 * ����һ�����ֵ�ƽ����
 */ 
public class SquareRoot {
	
	private static BufferedReader  stdIn =
        new BufferedReader(new  InputStreamReader(System.in));

    private static PrintWriter  stdOut =
        new PrintWriter(System.out, true);

    private static PrintWriter  stdErr =
        new PrintWriter(System.err, true);
    
    public static void computeSquRoot(){
    	try {
			stdErr.print("Enter an integer >  ");
	        stdErr.flush();
	        
	        String nStr = stdIn.readLine();       
			if (nStr == null){
				// ��throw�ؼ����׳��쳣�����쳣���׳�ʱ������������÷���
				throw new EmptyException("������ַ�������Ϊ�գ�");
			}
			
			double n = 0;			
			n = Double.parseDouble(nStr);
			
			if (n < 0){
				throw new OutOfRangeException("������ַ���ת���ɵ����ֱ�����ڵ���0��");
			}
			
			stdOut.println("the square root of "+ nStr + " is:"+Math.sqrt(n));
			
		} catch(IOException e){			
			e.printStackTrace();
			
		} catch(EmptyException e){
			e.printStackTrace();
			
		} catch (NumberFormatException e){				
			e.printStackTrace();
			
		} catch(OutOfRangeException e){
			e.printStackTrace();			
		} 			
		stdOut.println("finish!");
    }
	
	public static void main(String[] args){
			
		SquareRoot.computeSquRoot();
	}
}
