import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.EOFException;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class IOByteStream {
	private static final String NEW_LINE = System.getProperty("line.separator");

	public static void main(String[] args) {

		// Formatted memory input
		DataInputStream in1 = null;
		try {
			String s = "I am studying inputStream and outputStream" + NEW_LINE
					+ "sucessful!" + NEW_LINE;

			in1 = new DataInputStream(new ByteArrayInputStream(s.getBytes()));

			while (true) {
				System.out.print((char)in1.readByte());
			}
		} catch (EOFException e) {
			System.err.println("End of stream");
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				in1.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		// Storing & recovering data
		DataOutputStream out1 = null;
		DataInputStream in2 = null;
		try {
			out1 = new DataOutputStream(
					new BufferedOutputStream(new FileOutputStream("Data.txt")));

			out1.writeDouble(3.14159);
			out1.writeChars("That was pi£¬ºÃµÄ" + NEW_LINE);
			out1.writeBytes("That was pi£¬ÄãºÃ" + NEW_LINE);
			out1.flush();

			in2 = new DataInputStream(new BufferedInputStream(new FileInputStream("Data.txt")));

			// Must use DataInputStream for data:
			System.out.println(in2.readDouble());

			char c = in2.readChar();

			while (c != '\n') {

				System.out.print(c);
				c = in2.readChar();
			}
			System.out.println(c);

			byte b = in2.readByte();

			while ((char) (b) != '\n') {

				System.out.print((char) (b));
				b = in2.readByte();
			}
			in2.readByte();
			
		} catch (EOFException e) {
			System.err.println("End of stream");
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(out1 != null) {
				try {
					out1.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			
			if(in2 != null) {
				try {
					in2.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
