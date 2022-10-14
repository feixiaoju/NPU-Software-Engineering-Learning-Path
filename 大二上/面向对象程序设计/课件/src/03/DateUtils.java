
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

/**
 * 日期工具类
 * 
 * @author liyong
 * @since 0.1
 */
public class DateUtils {
	private static final String DATE_FORMAT_DEFAULT = "yyyy-MM-dd HH:mm:ss";
	private static final String DATE_FORMAT_YMD = "yyyy-MM-dd";
	private static final SimpleDateFormat DATE_FORMATER_DAY = new SimpleDateFormat(DATE_FORMAT_YMD);
	private static final SimpleDateFormat DATE_FORMATER_DAY_TIME = new SimpleDateFormat(DATE_FORMAT_DEFAULT);

	public static String getCurrentTime() {
		return DATE_FORMATER_DAY_TIME.format(Calendar.getInstance().getTime());
	}

	public static String getCurrentDay() {
		return DATE_FORMATER_DAY.format(Calendar.getInstance().getTime());
	}

	public static String getFormatedDay(Date date) {
		return DATE_FORMATER_DAY.format(date);
	}

	public static String getFormatedDayTime(Date date) {
		return DATE_FORMATER_DAY_TIME.format(date);
	}

	public static Date getParsedDay(String str) {
		try {
			return DATE_FORMATER_DAY.parse(str);
		} catch (ParseException e) {
			return null;
		}
	}

	public static Date getParsedDayTime(String str) {
		try {
			return DATE_FORMATER_DAY_TIME.parse(str);
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * 取得2个日期相差天数
	 * 
	 * @param fDate
	 * @param oDate
	 * @return
	 */
	public static int daysOfTwo(Date date1, Date date2) {

		Calendar cal1 = Calendar.getInstance();
		cal1.setTime(date1);

		Calendar cal2 = Calendar.getInstance();
		cal2.setTime(date2);
		int day1 = cal1.get(Calendar.DAY_OF_YEAR);
		int day2 = cal2.get(Calendar.DAY_OF_YEAR);

		int year1 = cal1.get(Calendar.YEAR);
		int year2 = cal2.get(Calendar.YEAR);
		if (year1 != year2) { // 不同年
			int timeDistance = 0;
			if (year1 < year2) {
				for (int i = year1; i < year2; i++) {
					if (i % 4 == 0 && i % 100 != 0 || i % 400 == 0) {// 闰年
						timeDistance += 366;
					} else {// 不是闰年
						timeDistance += 365;
					}
				}

				return timeDistance + (day2 - day1);
			} else {
				for (int i = year2; i < year1; i++) {
					if (i % 4 == 0 && i % 100 != 0 || i % 400 == 0) {// 闰年
						timeDistance += 366;
					} else {// 不是闰年
						timeDistance += 365;
					}
				}

				return -timeDistance + (day2 - day1);
			}
		} else {// 同一年
			// System.out.println("判断day2 - day1 : " + (day2 - day1));
			return day2 - day1;
		}

	}

	/**
	 * 取得指定移动天数的日期，例如getDiffDate(2017-11-01,1)得到2017-11-02
	 * ；getDiffDate(2017-11-01,3)得到2017-11-04
	 * 
	 * @param fdate
	 * @param days
	 * @return
	 */
	public static Date getDiffDate(Date fdate, int days) {
		Calendar aCalendar = Calendar.getInstance();
		aCalendar.setTime(fdate);
		aCalendar.add(Calendar.DAY_OF_MONTH, days);
		return aCalendar.getTime();
	}

	/**
	 * 日期字串转date
	 * 
	 * @param dateStr
	 * @param format
	 * @return
	 */
	public static Date parseDate(String dateStr, String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		try {
			return sdf.parse(dateStr);
		} catch (ParseException e) {
			return null;
		}

	}

	public static final String[] zodiacArr = { "猴", "鸡", "狗", "猪", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊" };

	public static final String[] constellationArr = { "水瓶座", "双鱼座", "白羊座", "金牛座", "双子座", "巨蟹座", "狮子座", "处女座", "天秤座",
			"天蝎座", "射手座", "魔羯座" };

	public static final int[] constellationEdgeDay = { 20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22 };

	/**
	 * 根据日期获取生肖
	 * 
	 * @return
	 */
	public static String getZodica(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		return zodiacArr[cal.get(Calendar.YEAR) % 12];
	}

	/**
	 * 根据日期获取星座
	 * 
	 * @return
	 */
	public static String getConstellation(Date date) {
		if (date == null) {
			return "";
		}
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int month = cal.get(Calendar.MONTH);
		int day = cal.get(Calendar.DAY_OF_MONTH);
		if (day < constellationEdgeDay[month]) {
			month = month - 1;
		}
		if (month >= 0) {
			return constellationArr[month];
		}
		// default to return 魔羯
		return constellationArr[11];
	}

	/**
	 * 获取当天的开始时间
	 * 
	 * @return yyyy-MM-dd HH:mm:ss 格式
	 */
	public static java.util.Date getDayBegin() {
		/*
		 * Calendar cal = new GregorianCalendar(); cal.set(Calendar.HOUR_OF_DAY, 0);
		 * cal.set(Calendar.MINUTE, 0); cal.set(Calendar.SECOND, 0);
		 * cal.set(Calendar.MILLISECOND, 0); return cal.getTime();
		 */
		Date date = new Date();
		return getDayStartTime(date);
	}

	/**
	 * 获取当天的结束时间
	 * 
	 * @return yyyy-MM-dd HH:mm:ss 格式
	 */
	public static java.util.Date getDayEnd() {
		/*
		 * Calendar cal = new GregorianCalendar(); cal.set(Calendar.HOUR_OF_DAY, 23);
		 * cal.set(Calendar.MINUTE, 59); cal.set(Calendar.SECOND, 59); return
		 * cal.getTime();
		 */
		Date date = new Date();
		return getDayEndTime(date);
	}

	/**
	 * 获取昨天的开始时间
	 * 
	 * @return 默认格式 Wed May 31 14:47:18 CST 2017
	 */
	public static Date getBeginDayOfYesterday() {
		Calendar cal = new GregorianCalendar();
		cal.setTime(getDayBegin());
		cal.add(Calendar.DAY_OF_MONTH, -1);
		return cal.getTime();
	}

	/**
	 * 获取昨天的结束时间
	 * 
	 * @return 默认格式 Wed May 31 14:47:18 CST 2017
	 */
	public static Date getEndDayOfYesterDay() {
		Calendar cal = new GregorianCalendar();
		cal.setTime(getDayEnd());
		cal.add(Calendar.DAY_OF_MONTH, -1);
		return cal.getTime();
	}

	/**
	 * 获取明天的开始时间
	 * 
	 * @return 默认格式 Wed May 31 14:47:18 CST 2017
	 */
	public static Date getBeginDayOfTomorrow() {
		Calendar cal = new GregorianCalendar();
		cal.setTime(getDayBegin());
		cal.add(Calendar.DAY_OF_MONTH, 1);

		return cal.getTime();
	}

	/**
	 * 获取明天的结束时间
	 * 
	 * @return 默认格式 Wed May 31 14:47:18 CST 2017
	 */
	public static Date getEndDayOfTomorrow() {
		Calendar cal = new GregorianCalendar();
		cal.setTime(getDayEnd());
		cal.add(Calendar.DAY_OF_MONTH, 1);
		return cal.getTime();
	}

	/**
	 * 获取本周的开始时间
	 * 
	 * @return yyyy-MM-dd HH:mm:ss 格式
	 */
	public static Date getBeginDayOfWeek() {
		Date date = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int dayofweek = cal.get(Calendar.DAY_OF_WEEK);
		if (dayofweek == 1) {
			dayofweek += 7;
		}
		cal.add(Calendar.DATE, 2 - dayofweek);
		return getDayStartTime(cal.getTime());
	}

	/**
	 * 获取本周的结束时间
	 * 
	 * @return yyyy-MM-dd HH:mm:ss 格式
	 */
	public static Date getEndDayOfWeek() {
		Calendar cal = Calendar.getInstance();
		cal.setTime(getBeginDayOfWeek());
		cal.add(Calendar.DAY_OF_WEEK, 6);
		Date weekEndSta = cal.getTime();
		return getDayEndTime(weekEndSta);
	}

	/**
	 * 获取本月的开始时间
	 * 
	 * @return yyyy-MM-dd HH:mm:ss 格式
	 */
	public static Date getBeginDayOfMonth() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(getNowYear(), getNowMonth() - 1, 1);
		return getDayStartTime(calendar.getTime());
	}

	/**
	 * 获取本月的结束时间
	 * 
	 * @return yyyy-MM-dd HH:mm:ss 格式
	 */
	public static Date getEndDayOfMonth() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(getNowYear(), getNowMonth() - 1, 1);
		int day = calendar.getActualMaximum(5);
		calendar.set(getNowYear(), getNowMonth() - 1, day);
		return getDayEndTime(calendar.getTime());
	}

	/**
	 * 获取本年的开始时间
	 * 
	 * @return yyyy-MM-dd HH:mm:ss 格式
	 */
	public static java.util.Date getBeginDayOfYear() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, getNowYear());
		// cal.set
		cal.set(Calendar.MONTH, Calendar.JANUARY);
		cal.set(Calendar.DATE, 1);

		return getDayStartTime(cal.getTime());
	}

	/**
	 * 获取本年的结束时间
	 * 
	 * @return yyyy-MM-dd HH:mm:ss 格式
	 */
	public static java.util.Date getEndDayOfYear() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, getNowYear());
		cal.set(Calendar.MONTH, Calendar.DECEMBER);
		cal.set(Calendar.DATE, 31);
		return getDayEndTime(cal.getTime());
	}

	/**
	 * 获取某个日期的开始时间
	 * 
	 * @param d
	 * @return yyyy-MM-dd HH:mm:ss 格式
	 */
	public static Timestamp getDayStartTime(Date d) {
		Calendar calendar = Calendar.getInstance();
		if (null != d)
			calendar.setTime(d);
		calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH), 0,
				0, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return new Timestamp(calendar.getTimeInMillis());
	}

	/**
	 * 获取某个日期的结束时间
	 * 
	 * @param d
	 * @return yyyy-MM-dd HH:mm:ss 格式
	 */
	public static Timestamp getDayEndTime(Date d) {
		Calendar calendar = Calendar.getInstance();
		if (null != d)
			calendar.setTime(d);
		calendar.set(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH), 23,
				59, 59);
		calendar.set(Calendar.MILLISECOND, 999);
		return new Timestamp(calendar.getTimeInMillis());
	}

	/**
	 * 获取某年某月的第一天
	 * 
	 * @param year
	 * @param month
	 * @return
	 */
	public static Date getStartMonthDate(int year, int month) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(year, month - 1, 1);
		return calendar.getTime();
	}

	/**
	 * 获取某年某月的最后一天
	 * 
	 * @param year
	 * @param month
	 * @return
	 */
	public static Date getEndMonthDate(int year, int month) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(year, month - 1, 1);
		int day = calendar.getActualMaximum(5);
		calendar.set(year, month - 1, day);
		return calendar.getTime();
	}

	/**
	 * 获取今年是哪一年
	 * 
	 * @return
	 */
	public static Integer getNowYear() {
		Date date = new Date();
		GregorianCalendar gc = (GregorianCalendar) Calendar.getInstance();
		gc.setTime(date);
		return Integer.valueOf(gc.get(1));
	}

	/**
	 * 获取本月是哪一月
	 * 
	 * @return
	 */
	public static int getNowMonth() {
		Date date = new Date();
		GregorianCalendar gc = (GregorianCalendar) Calendar.getInstance();
		gc.setTime(date);
		return gc.get(2) + 1;
	}

	/**
	 * 两个日期相减得到的天数
	 * 
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	public static int getDiffDays(Date beginDate, Date endDate) {

		if (beginDate == null || endDate == null) {
			throw new IllegalArgumentException("getDiffDays param is null!");
		}

		long diff = (endDate.getTime() - beginDate.getTime()) / (1000 * 60 * 60 * 24);

		int days = new Long(diff).intValue();

		return days;
	}

	/**
	 * 两个日期相减得到的毫秒数
	 * 
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	public static long dateDiff(Date beginDate, Date endDate) {
		long date1ms = beginDate.getTime();
		long date2ms = endDate.getTime();
		return date2ms - date1ms;
	}

	/**
	 * 获取两个日期中的最大日期
	 * 
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	public static Date max(Date beginDate, Date endDate) {
		if (beginDate == null) {
			return endDate;
		}
		if (endDate == null) {
			return beginDate;
		}
		if (beginDate.after(endDate)) {
			return beginDate;
		}
		return endDate;
	}

	/**
	 * 获取两个日期中的最小日期
	 * 
	 * @param beginDate
	 * @param endDate
	 * @return
	 */
	public static Date min(Date beginDate, Date endDate) {
		if (beginDate == null) {
			return endDate;
		}
		if (endDate == null) {
			return beginDate;
		}
		if (beginDate.after(endDate)) {
			return endDate;
		}
		return beginDate;
	}

	/**
	 * 返回某月该季度的第一个月
	 * 
	 * @param date
	 * @return
	 */
	public static Date getFirstSeasonDate(Date date) {
		final int[] SEASON = { 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4 };
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int sean = SEASON[cal.get(Calendar.MONTH)];
		cal.set(Calendar.MONTH, sean * 3 - 3);
		return cal.getTime();
	}

	/**
	 * 返回某个日期下几天的日期
	 * 
	 * @param date
	 * @param i
	 * @return
	 */
	public static Date getNextDay(Date date, int i) {
		Calendar cal = new GregorianCalendar();
		cal.setTime(date);
		cal.set(Calendar.DATE, cal.get(Calendar.DATE) + i);
		return cal.getTime();
	}

	/**
	 * 返回某个日期前几天的日期
	 * 
	 * @param date
	 * @param i
	 * @return
	 */
	public static Date getFrontDay(Date date, int i) {
		Calendar cal = new GregorianCalendar();
		cal.setTime(date);
		cal.set(Calendar.DATE, cal.get(Calendar.DATE) - i);
		return cal.getTime();
	}

	/**
	 * 获取某年某月到某年某月按天的切片日期集合（间隔天数的日期集合）
	 * 
	 * @param beginYear
	 * @param beginMonth
	 * @param endYear
	 * @param endMonth
	 * @param k
	 * @return
	 */
	public static List<List<Date>> getTimeList(int beginYear, int beginMonth, int endYear, int endMonth, int k) {
		List<List<Date>> list = new ArrayList<List<Date>>();
		if (beginYear == endYear) {
			for (int j = beginMonth; j <= endMonth; j++) {
				list.add(getTimeList(beginYear, j, k));

			}
		} else {
			{
				for (int j = beginMonth; j < 12; j++) {
					list.add(getTimeList(beginYear, j, k));
				}

				for (int i = beginYear + 1; i < endYear; i++) {
					for (int j = 0; j < 12; j++) {
						list.add(getTimeList(i, j, k));
					}
				}
				for (int j = 0; j <= endMonth; j++) {
					list.add(getTimeList(endYear, j, k));
				}
			}
		}
		return list;
	}

	/**
	 * 获取某年某月按天切片日期集合（某个月间隔多少天的日期集合）
	 * 
	 * @param beginYear
	 * @param beginMonth
	 * @param k
	 * @return
	 */
	public static List<Date> getTimeList(int beginYear, int beginMonth, int k) {
		List<Date> list = new ArrayList<Date>();
		Calendar begincal = new GregorianCalendar(beginYear, beginMonth, 1);
		int max = begincal.getActualMaximum(Calendar.DATE);
		for (int i = 1; i < max; i = i + k) {
			list.add(begincal.getTime());
			begincal.add(Calendar.DATE, k);
		}
		begincal = new GregorianCalendar(beginYear, beginMonth, max);
		list.add(begincal.getTime());
		return list;
	}

	/**
	 * 格式化日期 yyyy-MM-dd HH:mm:ss
	 * 
	 * @param date
	 * @return
	 */
	public static String formatDateTime(Date date) {
		SimpleDateFormat sd = new SimpleDateFormat(DATE_FORMAT_DEFAULT);
		return sd.format(date);
	}

	/**
	 * 格式化日期 yyyy-MM-dd
	 * 
	 * @param date
	 * @return
	 */
	public static String formatDate(Date date) {
		SimpleDateFormat sd = new SimpleDateFormat(DATE_FORMAT_YMD);
		return sd.format(date);
	}

	public static void main(String[] args) throws Exception {

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date d1 = sdf.parse("2017-12-31");
		Date d2 = sdf.parse("2017-12-30");

		System.out.println("相差天数 = " + daysOfTwo(d1, d2));

		System.out.println("指定年月的最后一天：" + getEndMonthDate(2017, 5));
		System.out.println("本周开始日期：" + getBeginDayOfWeek());
		System.out.println("本周结束日期：" + getEndDayOfWeek());
		System.out.println("本月开始日期：" + getBeginDayOfMonth());
		System.out.println("本月结束日期：" + getEndDayOfMonth());
	}

}
