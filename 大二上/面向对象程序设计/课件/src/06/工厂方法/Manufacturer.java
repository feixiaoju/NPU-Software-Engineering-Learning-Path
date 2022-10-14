/**/
public class Manufacturer {	
	SimpleMobileFactory factory;
	public Manufacturer(SimpleMobileFactory factory){
		this.factory = factory;
	}	
	Mobile orderMobile(String type){
		Mobile mobile;
		mobile = factory.createMobile(type);
		mobile.assembleMainboard();
		mobile.assembleSUBboard();
		mobile.assembleKeypad();
		mobile.assembleWholewidget();
		mobile.testing();
	}
}

