import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;

//文件输出流示例
public class FileOutputStreamDemo {

	private static final String NEW_LINE = System.getProperty("line.separator");

	public static void main(String[] args) {

		FileOutputStream writeFile = null;
		// FileWriter writeFile = null;
		try {
			writeFile = new FileOutputStream("output.txt");
			// writeFile = new FileWriter("output.txt");
			String s = "happy new year!happy everyday!" + NEW_LINE
					+ "wish fulfillment!" + NEW_LINE 
					+ "你好！" + NEW_LINE
					+ "End of file stream." + NEW_LINE;

			for (int i = 0; i < s.length(); i++) {
				writeFile.write(s.charAt(i));
			}

			// byte[] bytes = s.getBytes();
			// writeFile.write(bytes);
			// writeFile.write(bytes,0,s.length());

		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (writeFile != null) {
				try {
					writeFile.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
