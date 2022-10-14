
public class LabelDemo {
	public static void main(String[] args) {
		int students[][] = {{10, 12, 11}, {8, 9, 1}, {9, 15, 7}};
		jumpOutHere:
		for (int i = 0; i < 3; i++) {
		    System.out.println(String.format("start outer for loop index %d", i));
		    int j = 0;
		    while (j < 3) {
		        System.out.println(String.format("current retrieve value %d", students[i][j]));
		        if (students[i][j] == 9) {
		            break jumpOutHere;
		        } else {
		            j++;
		        }
		    }
		    System.out.println(String.format("end outer for loop index %d", i));
		}
		
		
	}
}
