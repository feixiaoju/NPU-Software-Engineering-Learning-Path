import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

//文件输入流示例
public class FileInputStreamDemo {
	public static void main(String[] args) {
		
		FileInputStream readFile = null;
//		FileReader readFile = null;
		try {
			readFile = new FileInputStream("FileInputStreamDemo.java");
//			readFile = new FileReader("FileInputStreamDemo.java");
			int intTemp = readFile.read();
			while(intTemp!=-1){
				System.out.print((char)intTemp);
				intTemp = readFile.read();
			}
		} catch(IOException e) {
			e.printStackTrace();
		} finally {
			if(readFile != null) {
				try {
					readFile.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

//		FileInputStream readFile = null;
//		try {
//			readFile = new FileInputStream("FileInputStreamDemo.java");
//			byte[] buffer = new byte[1024];
//			int byteLength = readFile.read(buffer, 0, 1024);
//			StringBuilder sb = new StringBuilder();
//			while (byteLength != -1) {
//				sb.append(new String(buffer, 0, byteLength));
//				byteLength = readFile.read(buffer, 0, 1024);
//			}
//			System.out.println(sb.toString());
//		} catch (IOException e) {
//			e.printStackTrace();
//		} finally {
//			try {
//				readFile.close();
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//		}
				
	}
}
