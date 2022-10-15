/**
 * ��־ģ���������б�
 * @type String
 */
var jst_blog_edit_class = new String('\
		<div class="g_h_20 b"><a id="addClass" class="c05" href="javascript:;" onclick="${objectName}.showClsAddDiv(\'add\', \'addClass\', -1, -1);"><span class="n_ e10_1 c05">&nbsp;</span>��ӷ���</a></div>\
    {if classes != null && classes.length != 0}\
    {for cls in classes}\
    <div class="g_h_18 g_htc_hvr i c06">\
    	 {if (pageName == "editBlogAll")}\
      	<p  class="g_t_hide g_htc_item {if selId != null && cls.id == selId} g_htc_item_selected{/if}" id="pBlogCls${cls.id}"><em>&#149;</em><a id="editClass${cls.id}" href="#" onclick="${parentName}.openBlogsByClass(\'${cls.id}\', \'${cls.className}\', ${cls.blogCount});return false;">${cls.className|escape}(${cls.blogCount})</a></p>\
      {else}\
      	<p  class="g_t_hide g_htc_item {if selId != null && cls.id == selId} g_htc_item_selected{/if}" ><em>&#149;</em><a id="editClass${cls.id}" href="${hostPath}/editBlogAll.do?p1=cls&p2=\'${cls.id}\'&p3=${cls.blogCount}">${cls.className|escape}(${cls.blogCount})</a></p>\
      {/if}\
      <span class="n_ n6 g_c_hand d" title="ɾ��" onclick="${objectName}.onClassDel(\'${cls.id}\', \'${cls.className|escape}\');">&nbsp;</span>\
		 	  <span class="n_ e7 g_c_hand d" title="�༭" onclick="${objectName}.showClsAddDiv(\'edit\', \'editClass${cls.id}\', -1, -1, \'${cls.id}\');">&nbsp;</span>\
    </div>\
    {/for}\
    {else}\
    	 &nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû�з���\
    {/if}\
');
/**
 * ��־ģ�����鵵�б�
 * @type String
 */
var jst_blog_edit_arch = new String('\
    {if yearArchs != null && yearArchs.length != 0}\
    {for yearArch in yearArchs}\
    	{if (yearArch_index==0 && sel != "arch") || (selId.toString().length >= 4 && (yearArch.year == selId.toString().substring(0,4)))}\
      <div id="divYearArch${yearArch.year}" class="g_htc_toggle g_h_20 g_c_hand g_t_left c05" onclick="${objectName}.showHideArch(\'${yearArch.year}\');"><span class="n_ n0 ck0">&nbsp;</span><span class="n_ n1 ck1">&nbsp;</span>${yearArch.year}��</div>\
    	{else}\
      <div id="divYearArch${yearArch.year}" class="g_htc_toggle g_h_20 g_c_hand g_t_left c05" onclick="${objectName}.showHideArch(\'${yearArch.year}\');"><span class="n_ n0 ck1">&nbsp;</span><span class="n_ n1 ck0">&nbsp;</span>${yearArch.year}��</div>\
    	{/if}\
      <div id="uYearArch${yearArch.year}" class="g_menu_07 c06" {if (!((yearArch_index==0 && sel != "arch") || (selId.toString().length >= 4 && (yearArch.year == selId.toString().substring(0,4)))))} style="display:none;"{/if}>\
        {for monthArch in yearArch.archives}\
        	{if (pageName == "editBlogAll")}\
          	<p class="g_t_hide g_h_18" id="pMonthArch${monthArch.year}_${monthArch.month}">\
          	<a href="#" {if selId != null && selId == monthArch.year + "-" + monthArch.month + "-01"} class="g_htc_item g_htc_item_selected" {else} class="g_htc_item"{/if}  onclick="${parentName}.openBlogsByArchive(\'${monthArch.toStandardStr()}\', \'${monthArch.year}-${monthArch.month}\', ${monthArch.count});return false;">${monthArch.month}��(${monthArch.count})</a></p>\
          {else}\
          	<p class="g_t_hide g_h_18">\
          	<a href="${hostPath}/editBlogAll.do?p1=arch&p2=\'${monthArch.toStandardStr()}\'&p3=${monthArch.count}" \
          		{if selId != null && selId == monthArch.year + "-" + monthArch.month + "-01"} class="g_f_init_select"{/if}>${monthArch.month}��(${monthArch.count})</a></p>\
          {/if}\
        {/for}\
      </div>\
    {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû�д浵\
    {/if}\
');

/**
 * ��־ģ����������б�, ���༭״̬��
 * @type String
 */
var jst_blog_edit_rcntcom = new String('\
    {if comments != null && comments.length != 0}\
      {for com in comments}\
        <div>\
        <p class="g_t_hide g_h_18 c05"><em>'+jst_global_sign+'</em>\
        	{if com.publisherName != ""}<a class="g_p_inline" href="http://${com.publisherName|parentDomain}/" target="_blank">${com.publisherNickname|escape}</a>\
        	{else}${com.publisherNickname|escape}{/if}:\
        </p>\
        <p class="g_t_hide g_h_18 in c07"><a href="${hostPath}/getBlog.do?bid=${com.blogId}">${com.content|substring:0,20|default:""|escape}</a></p>\
		</div>\
      {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû������\
    {/if}\
');    

/**
 * ��־�༭���������ģ��
 * @type String
 */
var jst_blog_edit_com = new String('\
    {for com in coms}\
    <div class="bd1b g_c_mvdn g_c_mvup">\
      <div class="g_h_20">\
        <div class="g_p_left g_c_hpdin g_w_60 g_t_hide g_t_left c06"><label class="c09">������:&nbsp;</label>\
        {if com.publisherName != ""}\
        <a href="http://${com.publisherName|parentDomain}" target="_blank">${com.publisherNickname}</a>\
        {else}\
        ${com.publisherNickname}\
        {/if}\
        </div>\
        <div class="g_p_right g_w_15 g_t_center"><span id="delcom${com.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteComment(\'${com.id}\');return false;" title="ɾ������">&nbsp;</span></div>\
        <div class="g_p_right g_w_20 g_t_center c09">${NetEase.DateTime.formatRecentDate(com.publishTime,"MM��dd�� HH:mm")}</div>\
      </div><div class="g_p_clear g_t_space">&nbsp;</div>\
      <div class="g_t_left g_c_pdin g_w_95 g_t_wrap c07">${com.content}</div>\
    </div>\
    {/for}\
');


var jst_blog_edit_trackback = new String('\
    {for tb in tbs}\
    <div class="bd1b g_c_mvdn g_c_mvup">\
      <div class="g_h_20">\
        <div class="g_p_left g_c_hpdin g_w_60 g_t_hide g_t_left c05"><a href="${tb.referBlogUrl}">${tb.referBlogTitle|default:""}</a></div>\
        <div class="g_p_right g_w_15 g_t_center"><span id="deltb${tb.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteTrackback(\'${tb.id}\');return false;" title="ɾ������">&nbsp;</span></div>\
        <div class="g_p_right g_w_20 g_t_center c09">${NetEase.DateTime.formatRecentDate(tb.referTime,"MM��dd�� HH:mm")}</div>\
      </div>\
      <div class="g_p_clear g_t_space">&nbsp;</div>\
    </div>\
    {/for}\
');


/**
 * ��־Ԥ��ģ���������б�
 * @type String
 */
var jst_blog_prev_class = new String('\
  	{if classes != null && classes.length != 0}\
  	{for cls in classes}\
	   	{if (pageName == "prevBlog")}\
	  	<p class="g_t_hide g_h_18" id="blogClassId${cls.id}"><em>&#149;</em><a href="#" onclick="applySelectCss(\'blogClassId${cls.id}\');${parentName}.openBlogsByClass(\'${cls.id}\', \'${cls.className|escape|js_string}\', ${classBlogCount[cls_index]});return false;">${cls.className|escape}(${classBlogCount[cls_index]})</a></p>\
	  	{else}\
	  	<p class="g_t_hide g_h_18" ><em>&#149;</em><a href="${hostPath}/prevBlog.do?clsId=${cls.id}&class=">${cls.className|escape}(${classBlogCount[cls_index]})</a></p>\
	  	{/if}\
  	{/for}\
  	{else}\
  	&nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû�з���\
  	{/if}\
');

/**
 * ��־Ԥ��ģ�����浵�б�
 * @type String
 */
var jst_blog_prev_arch = new String('\
    {if yearArchs != null && yearArchs.length != 0}\
    {for yearArch in yearArchs}\
    {if yearArch_index==0}\
      <div class="g_h_20 g_c_mvdn g_c_hand g_t_left n_ n1 c06" id="updown${yearArch.year}" onclick="${objName}.show_hide(\'yearArch${yearArch.year}\', \'updown${yearArch.year}\', true);return false;">${yearArch.year}��</div>\
      {else}\
      <div class="g_h_20 g_c_mvdn g_c_hand g_t_left n_ n0 c06" id="updown${yearArch.year}" onclick="${objName}.show_hide(\'yearArch${yearArch.year}\', \'updown${yearArch.year}\', true);return false;">${yearArch.year}��</div>\
      {/if}\
      <div id="yearArch${yearArch.year}" class="g_menu_07 c06" {if yearArch_index > 0}style="display:none;"{/if}>\
        {for monthArch in yearArch.archives}\
        	{if (pageName == "prevBlog")}\
          	<p class="g_t_hide g_h_18" id="monthArch${monthArch.year}_${monthArch.month}"><a href="#" onclick="applySelectCss(\'monthArch${monthArch.year}_${monthArch.month}\');${parentName}.openBlogsByArchive(\'${monthArch.toStandardStr()}\', \'${monthArch.toString()}\', ${monthArch.count});return false;">${monthArch.month}��(${monthArch.count})</a></p>\
          {else}\
          	<p class="g_t_hide g_h_18" id="monthArch${monthArch.year}_${monthArch.month}"><a href="${hostPath}/prevBlog.do?archive=${monthArch.toStandardStr()}">${monthArch.month}��(${monthArch.count})</a></p>\
          {/if}\
        {/for}\
      </div>\
    {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû�д浵\
    {/if}\
');    



var jst_blog_com_editall = new String('\
		{for com in comments}\
			<div id="ul_${blogId}" class="bdt g_c_mvdn">\
			 <div class="g_h_25">\
				 <div class="g_p_left g_c_hpdin g_w_70 g_t_hide g_t_left">\
					 <label class="c09">������:&nbsp;</label>\
					 {if com.publisherName!=null && com.publisherName != ""}<a class="c06" href="http://${com.publisherName|parentDomain}/" target="_blank">${com.publisherNickname|default:""|escape}</a>\
				 	 {else}${com.publisherNickname|default:""|escape}{/if}\
				 </div>\
				 <div class="g_p_right g_w_10 g_t_center"><span id="delcom_${com.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteComment(\'${com.id}\', \'${blogId}\');return false;" title="ɾ������">&nbsp;</span></div>\
				 <div class="g_p_right g_w_15 g_t_center c09">${NetEase.DateTime.formatRecentDate(com.publishTime,"MM��dd�� HH:mm")}</div>\
			 </div><div class="g_p_clear g_t_space">&nbsp;</div>\
			 <div class="g_t_left g_c_pdin g_w_95 g_t_wrap c07">${com.content|default:""}</div>\
		 </div>\
		{/for}\
');

var jst_blog_editall_trackback = new String('\
	{for tbs in trackbacks}\
	<div class="g_c_mvlft" id="ulTrackback_${blogId}">\
		 <div class="g_h_25 bdt">\
			 <div class="g_p_left g_c_hpdin g_w_70 g_t_hide g_t_left c07"><a href="${tbs.referBlogUrl}">${tbs.referBlogTitle|escape}</a></div>\
			 <div class="g_p_right g_w_10 g_t_center"><span id="deltb_${tbs.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteTrackback(\'${tbs.id}\', \'${blogId}\');return false;" title="ɾ������">&nbsp;</span></div>\
			 <div class="g_p_right g_w_15 g_t_center c09">${NetEase.DateTime.formatRecentDate(tbs.referTime,"MM��dd�� HH:mm")}</div>\
		 </div><div class="g_p_clear g_t_space">&nbsp;</div>\
	 </div>\
	 {/for}\
');
 
/**
 * Ԥ����־�б�
 * @type String
 */
var jst_blog_prev_list = new String('\
    {if blogs != null && blogs.length > 0}\
    {for b in blogs}\
    {if b_index < blogRange}\
    <div class="g_c_pdin item" id="blog_${b.id}">\
      <div class="g_title_00 g_t_bold g_p_2_height g_c_hand selitm" onclick="${objName}.show_hide_each_blog(\'${b.id}\', \'blogContent_\', \'classArrow_\');" title="�۵�/չ����־����">\
      	<span class="g_t_14 g_t_left g_w_90 g_t_hide c07" id="divBlogTitle${b.id}">${b.title|default:""|escape}</span>\
      	<div class="n_ n2" id="classArrow_${b.id}">&nbsp;</div>\
      </div>\
      <div id="blogContent_${b.id}" style="display:none;">\
	      <div class="g_title_00 g_c_pdin">\
	        <span class="g_t_left g_w_80 g_t_hide c08">\
	          {if b.className != null && b.className != ""}\
	             <label>����:&nbsp;</label>\
	             <a id="aBelongCls${b.id}" class="c06" href="#" onclick="${objName}.openSameClass(\'${b.classId}\', \'${b.className|escape|js_string}\');">${b.className|escape}</a>\
	          {/if}\
	          {if b.className != null && b.className != "" && b.tag != null && b.tag != ""}<nobr class="bd1c">&nbsp;|&nbsp;</nobr>{/if}\
	          {if b.tag != null && b.tag != ""}\
	             <label>��ǩ:&nbsp;</label>\
	             {for t in b.tagArray}{if t_index != 0}&nbsp;{/if}<a class="c06" href="#" onclick="${objName}.searchTagObj(\'${t|escape|js_string}\', false);return false;">${t|escape}</a>{if t_index < b.tagArray.length - 1},{/if}{/for}\
	          {/if}\
	        </span>\
	        <div class="c08">�ֺ�&nbsp;[\
	          <a id="aFontLarge${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 1);return false;">��</a>&nbsp;\
	          <a id="aFontMedium${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 2);return false;">��</a>&nbsp;\
	          <a id="aFontSmall${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 3);return false;">С</a>]\
	        </div>\
	      </div>\
	      <div class="g_c_pdin g_t_left c07 content" id="blogtext_${b.id}">${b.content|default:""}</div>\
	      <div class="g_t_center"><div id="relateBlogCircle_${b.id}" class="g_t_left g_p_center" style="width:95%;"></div></div>\
      </div>\
      <div class="g_tab_btn00 g_t_left g_c_mvdn g_h_18" id="cssTabBar_${b.id}">\
        <div class="c08">${b.accessCount}���Ķ�</div>\
        <div class="bd1l bd1r" id="openPermaDiv${b.id}"><a id="aOpenPerma${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openPermaDiv${b.id}\');${objName}.openPermalink(\'${b.id}\', \'${b.permalink}\');return false;">�̶�����<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="bd1l bd1r"><a id="share${b.id}" class="c05" href="#" onclick="${objName}.showShareDiv(\'${b.id}\', \'${b.permalink}\');return false;">����</a></div>\
        <div class="bd1l bd1r" id="openTbDiv${b.id}"><a id="aOpenTb${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openTbDiv${b.id}\');${objName}.openTrackbacks(\'${b.id}\', \'${b.trackbackUrl}\');return false;">���� (${b.trackbackCount})<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="bd1l bd1r" id="openComDiv${b.id}"><a id="aOpenCom${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openComDiv${b.id}\');${objName}.openComments(\'${b.id}\', ${b.commentCount}, \'${b.title|escape|js_string}\', \'${b.permalink}\');return false;">���� (<nobr id="comCount_${b.id}">${b.commentCount}</nobr>)<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="c09">��${NetEase.DateTime.formatDate(b.publishTime,"YYYY-MM-dd HH:mm")}</div>\
        <input id="openPerma_${b.id}" type="hidden" value="0"/><!--0��ʾ�رգ�1��ʾ��-->\
	    <input id="openCom_${b.id}" type="hidden" value="2"/><!--0��ʾ�رգ�1��ʾ�򿪣�2��ʾ����δ����-->\
	    <input id="openTrack_${b.id}" type="hidden" value="2"/><!--0��ʾ�رգ�1��ʾ�򿪣�2��ʾ����δ����-->\
      </div><div class="g_p_clear g_t_space">&nbsp;</div>\
	  <div class="g_t_left" id="perma_${b.id}" style="display:none;">\
	    <div class="g_h_20 g_c_mvdn"><span id="aClosePerma${b.id}" class="g_p_right g_c_hand n_ n7" onclick="${objName}.closeCssTabBarAll(\'${b.id}\');${objName}.closePermalink(\'${b.id}\');return false;" title="�ر�">&nbsp;</span></div>\
		<div class="g_c_pdin">\
		  <div class="c08">���ĵĹ̶���������:&nbsp;&nbsp;<span id="permCopyFinished_${b.id}" class="n_ f17" style="display:none;">�����������ӳɹ�</span></div>\
		  <div>\
		    <a id="aPerma${b.id}" class="c06" href="http://${hostName|parentDomain}/${b.permalink}" target="_blank">http://${hostName|parentDomain}/${b.permalink}</a>&nbsp;\
			<a id="copyPerma${b.id}" class="g_c_button bd01 butn c05" onclick="clickTBUrl(\'aPerma${b.id}\', \'permCopyFinished_${b.id}\')" title="������������">������</a>\
		  </div>\
		</div>\
	  </div>\
      <div id="com_${b.id}" class="g_p_relative g_h_1" style="display:none;">\
	     <div id="comShow_${b.id}"></div>\
	  	 <div id="comPub_${b.id}" class="g_h_1"></div>\
	  </div>\
	  <div id="track_${b.id}" class="g_t_left" style="display:none;"></div>\
    </div>\
    {/if}\
    {/for}\
    {else}\
      <div class="g_c_pdin">\
	     {if loadType == "class"}\
	      	 �÷���������־��\
	     {elseif loadType == "archive"}\
	      	 �ù鵵������־��\
	     {else}\
			 ������־��\
	     {/if}\
	  </div>\
    {/if}\
');    

/**
 * 
 */
var jst_blog_edit_list = new String('\
		{if blogs != null && blogs.length > 0}\
    <div class="g_c_container">\
      <table border="0" cellspacing="0" cellpadding="0">\
        <tr class="c09"><td class="g_w_60 g_t_left c09">����</td><td class="g_w_15 g_t_left c09">���</td><td class="g_w_15 c09 g_t_center">����ʱ��</td><td class="g_w_10 c09 g_t_center">ɾ��</td></tr>\
        {for b in blogs}\
        <tr class="g_htc_selitm">\
          <td class="g_t_left g_t_hide c05"><a href="${hostPath}/blog/getBlog.do?bid=${b.id}">${b.title|escape}</a></td>\
          <td class="g_t_left g_t_hide c08">{if b.className != null && b.className != ""}${b.className|escape}{/if}</td>\
          <td class="g_t_center c09">${NetEase.DateTime.formatRecentDate(b.publishTime,"YYYY�� MM��dd�� HH:mm")}\
      			{if (b.isPublished == 0 && (b.valid == 0 || b.valid == 4))}<br/><b>�ݸ�</b>\
      			{elseif (b.isPublished == 1 && b.valid == 16)}<br/><b>δ�������д�ϵͳ�����</b>\
      			{elseif (b.isPublished == 1 && b.valid == 24)}<br/><b>δ�������д�ϵͳ�����</b>\
      			{elseif (b.isPublished == 1 && b.valid == 25)}<br/><b>��˲�ͨ��</b>\
      			{elseif (b.valid == 26)}<br/><b>�ѱ����Σ����������Ķ�</b>\
      			{/if}</td>\
          <td class="g_t_center"><span id="delblog_${b.id}" class="g_c_hand n_ n6" title="ɾ��blog" onClick="${objectName}.deleteBlog(\'${b.id}\', ${b.isPublished}, ${b.valid}, ${b.publishTime}, ${b.allowView}, \'${b.classId}\');return false;">&nbsp;</span></td>\
        </tr>\
        {if ((b.isPublished == 1) && (b.commentCount > 0 || b.trackbackCount > 0))}\
        <tr>\
        	<td colspan="4" class="g_t_left g_c_lmvlft">\
        	{if b.commentCount > 0}\
        	<input id="open_${b.id}" type="hidden" value="0"/>\
        	<div id="blogshowcomment_${b.id}">\
							<div><a class="g_p_left g_htc_toggle" href="javascript:;" onclick="${objectName}.switchComments(\'${b.id}\', ${b.commentCount});return false;">\
								<span id="imgCom${b.id}"><span class="ck0 n_ n4">&nbsp;</span><span class="ck1 n_ n5">&nbsp;</span></span>����:<nobr id="comCount_${b.id}">${b.commentCount}</nobr>&nbsp;&nbsp;</a>\
								<div id="comPageNav_${b.id}" class="g_p_left g_w_30"></div>\
								<div class="g_p_clear g_t_space">&nbsp;</div>\
							</div>\
							<div class="g_c_mvlft" id="_$_com_editall_${b.id}" style="display:none;"></div>\
					</div>\
        	{/if}\
        	{if b.trackbackCount > 0}\
	        	<div>\
					<div id="tbsdiv_${b.id}">\
						<a class="g_htc_toggle" href="javascript:;" onclick="${objectName}.switchTrackback(\'${b.id}\');return false;">\
							<span id="imgTb${b.id}"><span class="ck0 n_ n4">&nbsp;</span><span class="ck1 n_ n5">&nbsp;</span></span>����:<nobr id="tbCount_${b.id}">${b.trackbackCount}</nobr></a>\
						<input id="open2_${b.id}" type="hidden" value="0"/>\
						<div class="g_c_mvlft" id="_$_tb_editall_${b.id}" style="display:none;"></div>\
					</div>\
				</div>\
        	{/if}\
        	</td>\
        </tr>\
        {/if}\
        {/for}\
      </table>\
    </div>\
    {else}\
    <div class="g_c_container">\
	  		{if loadType == "class"}\
	      		û�и÷������־��\
	      {elseif loadType == "archive"}\
      			û�иù鵵��������־��\
	      {else}\
	      		������־���ɵ��"�����־"�������־���ݡ�\
	      {/if}\
  	</div>\
    {/if}\
');

/**
 * Ԥ��ҳ������ͨ��
 */
var jst_blog_prev_track = new String('\
	<div class="g_h_20 g_c_mvdn"><span class="g_p_right g_c_hand n_ n7" id="aCloseTb${blogId}" onclick="${objName}.closeCssTabBarAll(\'${blogId}\');${objName}.closeTrackbacks(\'${blogId}\');return false;">&nbsp;</span></div>\
		<div class="g_c_pdin">\
			<div class="c08">�������õ�ַ:&nbsp;&nbsp;<span id="copyFinished_${blogId}" style="display:none" class="n_ f17">�����������ӳɹ�</span></div>\
			<div>\
				<a id="tb_${blogId}" class="c06"><span>http://${hostName|parentDomain}/${tbUrl}</span></a>&nbsp;\
				<a id="imgCopyPerma${blogId}" class="g_c_button bd01 butn c05" title="������������" onclick="clickTBUrl(\'tb_${blogId}\', \'copyFinished_${blogId}\')" >������</a>&nbsp;\
				<a id="imgRefer${blogId}"  class="g_c_button bd01 butn c05" title="������ƪ��־" {if visitorName!=null && visitorName != ""}onclick="window.open(\'http://${visitorName|parentDomain}/blog/getBlog.do?bid=${blogId}&r=1&host=${visitorName}&uid=${hostId}\');"{else}onclick="showLoginDlg(\'\');return false;" {/if}>������</a>\
			</div>\
		</div>\
		{if tbs != null && tbs.length != 0}\
			<div class="g_menu_06 c09">\
			<p class="g_h_20 g_t_left c08">���ü�¼:</p>\
			{for tb in tbs}\
			  <div>\
				<p class="g_t_hide g_h_18 c05"><em>&#149;</em><a class="c05" href="${tb.referBlogUrl}" target="_blank">${tb.referBlogTitle|default:""|escape}</a>\
				(<label class="c09">������:&nbsp;</label>&nbsp;<a class="c06" href="${tb.referHomePage|default:""|escape}" target="_blank">${tb.referBloggerName|default:""|escape}</a>)</p>\
			  </div>\
			{/for}\
			</ul>\
		{/if}\
');

var jst_blog_prev_related_circle = new String('\
    {if relateCircles.length != 0}\
    <div style="margin:50px 0px;">\
	    <div class="blogCircleHint c08">���Ȧ���Ƽ�</div><div class="blogCircleDash bd1c"></div><div style="clear: both;"></div>\
	    <table class="relateCircleBody">\
	    	{for circleBlogs in relateCircles}\
	    		{if circleBlogs.length>=1}\
	    		<tr style="vertical-align:middle">\
		    		<td style="width:5px;height:20px;margin:0px;padding:0px" class="c06">&#149;</td>\
		    		<td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyLeft"><a class="c06" href="${circleBaseUrl}/${circleBlogs[0].circle.urlName}" target="_blank">${circleBlogs[0].circle.name|escape}</a></td>\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight"><a class="c05" href="${CircleInfo.getCircleBlogLink(circleBlogs[0].circle.urlName, circleBlogs[0].blogUserName, circleBlogs[0].permalink)}" target="_blank">${circleBlogs[0].blogTitle|escape}</a></td>\
				    {if circleBlogs.length>=2}\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight"><a class="c05" href="${CircleInfo.getCircleBlogLink(circleBlogs[1].circle.urlName, circleBlogs[1].blogUserName, circleBlogs[1].permalink)}" target="_blank">${circleBlogs[1].blogTitle|escape}</a></td>\
				    {else}\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight">&nbsp;<td>\
				    {/if}\
			    </tr>\
	    		{/if}\
	    	{/for}\
	    </table>\
    </div>\
    {/if}\
');
/**************************************************************
*				163 blog Blog Permalink Page				  *
*                                                             *
* Written by:  zhujingbo &&  zhuyiwen                         *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2007-01-04									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * �̶�����ҳ��ʹ�õ�Javascript���ƴ���
 * 
 * @author  zhujingbo (zhujingbo@corp.netease.com) &&  zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 2.0 
 * @requires  utils.js
 * @requires  prototype.js
 */
 
if (NEBlog==undefined){
	var NEBlog={};
}
/**
 * ȫ�ֱ���, PermaLinkPage����ʵ��, ����ftlҳ�����
 * @type	NEBlog.PermaLinkPage
 */
NEBlog.gPermaLinkPage = null;

/**
 * ȫ�ֺ���, ����PermaLinkPage����ʵ��, ftlҳ��onloadʱ����
 * @param	{String}	sServerName				����������
 * @param	{String}	sStyle					���͵���ʽ��ͼƬ�ĵ�ַǰ׺
 * @param	{String}	sBlogId					��ƪblog��id
 * @param	{Number}	iHostId					������id
 * @param	{Number}	iCommentRange			ÿҳ��ʾ����������
 * @param	{Number}	iCommentCount			��ƪ���͵���������
 * @param	{Number}	iGlobalAllowComment		�û����õ�����ȫ�ַ���Ȩ�� -100��ʾ�κ��˿����ۣ�0��ʾ��¼�û������ۣ�100��ʾ�������ۣ�10000��ʾ���ѿ�����
 * @param	{Number}	iVisitorId				�����ߴ�ƪblog���û�id
 * @param	{String}	sVisitorName			�����ߵ�����(����ͨ��֤ID)
 * @param	{String}	sVisitorNickname		�����ߵ��ǳ�
 * @param	{String}	sVisitorAvatar			�����ߵ�ͷ���ַ
 * @param	{String}	sVisitorIP				�����ߵ�IP
 * @param	{String}	sHostName				������hostName, ƴ��blog.163ǰ���û���
 * @param	{String}	sHostPath				������hostPath
 * @param	{Number}	iVisitorRank			��������ݵȼ���-100:������0:��½�û���100:���ѣ�10000:����
 * @param	{String}	sBlogTitle				��ƪ���ͱ���
 * @param	{String}	sBlogPermalink			���͵ľ�̬���ӵ�ַ, ��: blog/static/66779620070561956531
 * @param	{Number}	iSrl					��̬���Ӻ����Ψһ�����ִ�, ��66779620070561956531		
 * @param	{String}	sDivComShowId			ҳ����ʾ�������б���ʾ����div��id
 * @param	{String}	sDivComPubId			ҳ����ʾ�����۷�����div��id
 * @param	{String}	sCircleBaseUrl			Ȧ�ӵ�serverName
 * @param	{String}	sTestOn					�Ƿ���в���, on����off
 */
function gLoadPermaLink(sServerName,sStyle, sBlogId, iHostId, iCommentRange, iCommentCount, iGlobalAllowComment, 
							iVisitorId, sVisitorName, sVisitorNickname, sVisitorAvatar, sVisitorIP, sHostName, 
							sHostPath, iVisitorRank, sBlogTitle, sBlogPermalink, iSrl,  
							sDivComShowId, sDivComPubId, sCircleBaseUrl, sTestOn) 
{
//	htmleditor = new NECtrl.HtmlEditor(sBlogId, "com_" + sBlogId, {
//					iWidth: 0, iHeight: 350, sObjName: "htmleditor", iMaxLen: 1000});
	//����NEBlog.PermaLinkPage�Ĺ��캯��
	NEBlog.gPermaLinkPage = new NEBlog.PermaLinkPage('NEBlog.gPermaLinkPage',
							{sServerName:sServerName, sStyle:sStyle, sBlogId:sBlogId, iHostId:iHostId,
							iCommentRange:iCommentRange, iCommentCount:iCommentCount, 
							iGlobalAllowComment:iGlobalAllowComment, iVisitorId: iVisitorId,
							sVisitorName:sVisitorName, sVisitorNickname:sVisitorNickname, 
							sVisitorAvatar:sVisitorAvatar, sVisitorIP:sVisitorIP, sHostName:sHostName,
							sHostPath:sHostPath, iVisitorRank:iVisitorRank, sBlogTitle:sBlogTitle,
							sBlogPermalink:sBlogPermalink, iSrl:iSrl, 
							sDivComShowId:sDivComShowId, sDivComPubId:sDivComPubId, sCircleBaseUrl:sCircleBaseUrl, 
							sTestOn:sTestOn});
}

/**
 * NEBlog.PermaLinkPage Class
 *
 * @class �̶�����ҳ�����
 */
NEBlog.PermaLinkPage = Class.create();


/**
 * ȫ�ֱ�����������TrimPathģ��parse��Ķ���
 * ������ʾ��־�������б�
 * @type	Object
 */
NEBlog.PermaLinkPage.trackbacksTemplate = null;

/**
 * ȫ�ֱ�����������TrimPathģ��parse��Ķ���
 * ������ʾ��־�����Ȧ���Ƽ�
 * @type	Object
 */
NEBlog.PermaLinkPage.relateBlogCircleTemplate = null;


NEBlog.PermaLinkPage.prototype = {
	/**
	 * PermaLinkPage�๹�캯�� ��ʼ��PermaLinkPage����Ԥ�����
	 * @constructor
	 * @param 	{String}	sObjectName  	PermaLinkPageʵ����������	
	 * @return 	{NEBlog.PermaLinkPage} 		PermaLinkPage����
	 * @see 	#_init
	 */
	initialize: function(sObjectName){
		/**
		 * ��ʼ������ѡ��
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({
			sServerName:			null,	// ����������
			sStyle:               	null,	// ���͵���ʽ��ͼƬ�ĵ�ַǰ׺
			sBlogId:             	null,	// ��ƪblog��id
			iHostId:           	   	null,	// ������id
			iCommentRange:     	   	null,	// ÿҳ��ʾ����������	
			iCommentCount:     	   	null,	// ��ƪ���͵���������
			iGlobalAllowComment:  	null,	// �û����õ�����ȫ�ַ���Ȩ�� -100��ʾ�κ��˿����ۣ�0��ʾ��¼�û������ۣ�100��ʾ�������ۣ�10000��ʾ���ѿ�����
			iVisitorId:           	null,	// �����ߴ�ƪblog���û�id
			sVisitorName:			null,	// �����ߵ�����(����ͨ��֤ID)
			sVisitorNickname:		null,	// �����ߵ��ǳ�
			sVisitorAvatar:			null,	// �����ߵ�ͷ���ַ
			sVisitorIP:				null,	// �����ߵ�IP
			sHostName:				null,	// ������hostName, ƴ��blog.163ǰ���û���
			sHostPath:				null,	// ������hostPath
			iVisitorRank:			null,	// ��������ݵȼ���-100:������0:��½�û���100:���ѣ�10000:����
			sBlogTitle:				null,	// ��ƪ���ͱ���
			sBlogPermalink:			null,	// ���͵ľ�̬���ӵ�ַ, ��: blog/static/66779620070561956531
			iSrl:					null,	// ��̬���Ӻ����Ψһ�����ִ�, ��66779620070561956531					
			sDivComShowId:			null,	// ҳ����ʾ�������б���ʾ����div��id
			sDivComPubId:			null,	// ҳ����ʾ�����۷�����div��id
			sCircleBaseUrl:			null,	// Ȧ��url��serverName
			sTestOn:				'off'	// �Ƿ���в���, on����off
						
		}, arguments[1]||{});
		/**
		 * PermaLinkPageʵ����������
		 * @private
		 * @type	String
		 */
		this._sObjectName = sObjectName;
		/**
		 * �����������
		 * @private
		 * @type	Number
		 */
		this._iCommentMaxLen = 1000;
		/**
		 * ��Ϊblinddown����ʱ,��Ҫ����������ʾ�����ص�ͬ��״̬
		 * ָʾ��ǰ�Ƿ���"��ʾ/����"��ť
		 * @private
		 * @type	Boolean
		 */
		this._bShowHiding = false;
		/**
		 * ���Զ���
		 * @private
		 * @type	Object
		 */
		this._oTester4PB = null;
		/**
		 * ��Ϊblinddown����ʱ,��Ҫ�����ĸ�blinddown���ڵĴ򿪹ر�ͬ������
		 * blinddown��ʾ��һ������������Ǹ����Ӷ�Ӧ�Ĵ���
		 * _iGid���ڿ����ĸ����ڵĴ򿪹ر�ͬ������
		 * @private
		 * @type	Number
		 */
		this._iGid ;
		/**
		 * ���۶���ʵ��
		 * @type	NetEase.CommentPublish
		 */
		this.commentPublish = null;
		/**
		 * ��־���²���������չ���͹ر�״̬
		 * ��Ŵ򿪺͹ر�״̬
		 * ����־�򿪵Ĺ�������Ӧ��Div��id
		 * @type 	Object
		 */
		this._oBlogToolsUpDown = 'openComDiv'+this._oOptions.sBlogId;
		
		this._init();
		
		return this;

	},
	/**
	 * ��ʼ������, ��ʾ��������
	 * @return	{Void}
	 */
	_init: function(){
//		htmleditor = new NECtrl.HtmlEditor(this._oOptions.sBlogId, "com_" + this._oOptions.sBlogId, {
//					iWidth: 0, iHeight: 350, sObjName: "htmleditor", iMaxLen: 1000});
					
		if (this._oOptions.sTestOn == 'on')
			this._oTester4PB = new NECtrl.SeleniumTester();
		else
			this._oTester4PB = null;

		// ����NEBlog.gPermalink_Comments����ftl�й���������js���۶�������
		this._showComments(NEBlog.gPermalink_Comments, this._oOptions.sBlogId, this._oOptions.iHostId, this._oOptions.iCommentCount, 
		    				this._oOptions.iCommentRange, this._oOptions.iGlobalAllowComment, this._oOptions.iVisitorId, 
		    				this._oOptions.sVisitorName, this._oOptions.sVisitorNickname, this._oOptions.sVisitorAvatar, 
		    				this._oOptions.sHostName, this._oOptions.iVisitorRank, this._oOptions.sBlogTitle, 
		    				this._oOptions.sBlogPermalink, this._oOptions.iSrl, this._oOptions.sDivComShowId, 
		    				this._oOptions.sDivComPubId);	
		// ����ͨ������		
		NEBlog.PermaLinkPage.trackbacksTemplate = createJSTAndParse("jst_blog_prev_track", jst_blog_prev_track);
		// ���Ȧ���Ƽ������
		NEBlog.PermaLinkPage.relateBlogCircleTemplate = createJSTAndParse("relateBlogCircle_jst", jst_blog_prev_related_circle);
		this._showRelateBlogCircle(this._oOptions.sBlogId);
		
	},
	/**
	 * �������۶���, ������ʾ��������
	 * @private
	 * @param	{Array}		oComments				���۶����б�
	 * @param	{String}	sBlogId					��ƪblog��id
	 * @param	{Number}	iHostId					������id
	 * @param	{Number}	iCommentCount			��ƪ���͵���������
	 * @param	{Number}	iPageRange				ÿҳ��ʾ����������
	 * @param	{Number}	iGlobalAllowComment		�û����õ�����ȫ�ַ���Ȩ�� -100��ʾ�κ��˿����ۣ�0��ʾ��¼�û������ۣ�100��ʾ�������ۣ�10000��ʾ���ѿ�����
	 * @param	{Number}	iVisitorId				�����ߴ�ƪblog���û�id
	 * @param	{String}	sVisitorName			�����ߵ�����(����ͨ��֤ID)
	 * @param	{String}	sVisitorNickname		�����ߵ��ǳ�
	 * @param	{String}	sVisitorAvatar			�����ߵ�ͷ���ַ
	 * @param	{String}	sHostName				������hostName, ƴ��blog.163ǰ���û���
	 * @param	{Number}	iVisitorRank			��������ݵȼ���-100:������0:��½�û���100:���ѣ�10000:����
	 * @param	{String}	sBlogTitle				��ƪ���ͱ���
	 * @param	{String}	sBlogPermalink			���͵ľ�̬���ӵ�ַ, ��: blog/static/66779620070561956531
	 * @param	{Number}	iSrl					��̬���Ӻ����Ψһ�����ִ�, ��66779620070561956531		
	 * @param	{String}	sDivComShowId			ҳ����ʾ�������б���ʾ����div��id
	 * @param	{String}	sDivComPubId			ҳ����ʾ�����۷�����div��id
	 * @return	{Void}
	 */
	_showComments: function(oComments, sBlogId, iHostId, iCommentCount, iPageRange, iGlobalAllowComment, iVisitorId, sVisitorName, sVisitorNickname,
						sVisitorAvatar, sHostName, iVisitorRank, sBlogTitle, sBlogPermalink, iSrl, sDivComShowId, sDivComPubId) {
		
		$("smallfont").focus();// �Ƚ������õ�һ�������ϣ���������Ϊ��ʹ�򿪵����۱༭�����������뽹�㵼��ҳ��������
		var _iCommentRight = iGlobalAllowComment;
		this.commentPublish = new NetEase.CommentPublish(oComments, sBlogId, iCommentCount, sDivComShowId, sDivComPubId, 
								{sStyle: this._oOptions.sStyle, bCanClose: true, 
								bHasCancelBtn: true, bNeedCheckLogin: false, bNeedCheckRight: true, 
								iAllowComment: _iCommentRight, iPageSize: iPageRange, iHostId: iHostId, sHostName: sHostName, 
								iVisitorId: iVisitorId, sVisitorName: sVisitorName, sVisitorNickname: sVisitorNickname,
								sLoginRedirect: '/'+sHostName+'/blog/static/'+iSrl,
								sVisitorAvatar: sVisitorAvatar, iVisitorRank: iVisitorRank, sVisitorIP: this._oOptions.sVisitorIP, 
								iEditorMaxLen: this._iCommentMaxLen, bSupportDeleteComment: false, 
								iInputWidth: 720, iEditorHeight: 230, fnAddComment: this.addNewComment.bind(this), 
								oAddCommentParams: {blogUserId: iHostId, blogTitle: sBlogTitle, blogPermalink: sBlogPermalink},
								fnAfterAddComment: this.afterAddComment.bind(this), oAfterAddCommentParams: {blogId: sBlogId},
								fnMoreData: this.getCommentsByPage.bind(this), fnCloseComments: this.closeComments,	fnReportBad: this.reportBad,					
								sObjName: this._sObjectName+'.commentPublish', bDefaultPubClose: false,
								bSupportDeleteComment:true,
								fnDelComment: this.delComment, oDelCommentParams:{blogId:sBlogId},
								fnAfterDelComment:this.afterDelComment, oAfterDelCommentParams:{blogId:sBlogId},
								fnCloseCommentDiv: this.closeCssTabBarAll.bind(this)});	
		if (this._oTester4PB != null) {
			if (oComments == null || oComments.length == 0) {
				this._test4PB("Com", "null"); 
			} else {
				var _aComId = oComments.pluck("id");
				this._test4PB("Com", _aComId);
			}
		}
		
	},

	/**
	 * dwr����, �������������
	 * @param	{Object}	oNewComment			���۶���
	 * @param	{Object}	oParams				��������
	 * @param	{Object}	fnPostAddComment	������Ӻ�Ķ�������
	 * @return	{Void}
	 */
 	addNewComment: function(oNewComment, oParams, fnPostAddComment) {
		//��ʽ���������򷵻صĶ���
		oNewComment.blogId = oNewComment.parentId;
		oNewComment.blogUserId = oParams.blogUserId;
		var _iFilterType = 0;
		var _oDivValcode = $("valcode"+oNewComment.parentId);
		var _iValcode;
		if (_oDivValcode != null)
			_iValcode = _oDivValcode.value;
		else
			_iValcode = -1;
		if (this._oOptions.iVisitorRank < Const.Rank.Friend) {
			var _bMatch = checkOtherSiteUrl(oNewComment.content);
			if (_bMatch) {
				alert(Local.Message.Blog[0]);
				fnPostAddComment(null);
				return false;
			}
		}
		BlogBean.addComment(oNewComment, _iFilterType, _iValcode, {
			  callback:function(oDataFromServer) {
			    fnPostAddComment(oDataFromServer);
			  },
			  errorHandler:function(ex) {
			  	//��֤�������ʾ
			  	if (captchaWarning(ex, "$$_comsubmithint" + oNewComment.blogId)) {
			  		fnPostAddComment(null);
			  		return false;
			  	}
			  	//�ؼ��ֹ�����ʾ
			  	var _iFilterType = filterWarning(ex);
			  	if (_iFilterType == -1) {
			  		fnPostAddComment(null);
			  		return false;
			  	}		  		  	
			  	fnPostAddComment(null);	
			  }
			});	
	},
	/**
	 * ������ۺ�, �������ۼ���
	 * dwr����, �������������
	 * @param	{Object}	oNewComment			���۶���
	 * @param	{Object}	oParams				��������
	 * @return	{Void}
	 */
	afterAddComment: function(oNewComment, oParams) {
		//����������
		var _oComCount = $("comCount_" + oParams.blogId);
		if (_oComCount != null) {
			var count = _oComCount.innerHTML;
			_oComCount.innerHTML = parseInt(count) + 1;
		}
		new Effect.ScrollTo("openComDiv"+oParams.blogId, {duration:0.0});	
	},
	/**
	 * ����ҳ���ȡ���۶���
	 * @param	{String}	sBlogId				blog��id
	 * @param	{Number}	iLimit				�Ӻ�̨ȡ����������
	 * @param	{Number}	iOffset				�ӵڼ������ۿ�ʼȡ
	 * @param	{Object}	fnPostPageComment	ȡ�����ۺ�ĺ�������, ��ҳ������ʾ��
	 */
	getCommentsByPage: function(sBlogId, iLimit, iOffset, fnPostPageComment) {
		BlogBean.getComments(sBlogId, iLimit, iOffset, {
			  callback:function(oDataFromServer) {
			    fnPostPageComment(oDataFromServer);
			    
			    if (this._oTester4PB != null) {
			    	if (oDataFromServer == null || oDataFromServer.length == 0) {
			    		this._test4PB("Com", "null");
			    	} else {
						var _aComId = oDataFromServer.pluck("id");
						this._test4PB("Com", _aComId);
			    	}
				}			
			  }
			});	
	},

	/**
	 * ����������
	 * @param	{String}	sBlogId				blog��id
	 * @param	{Number}	iCommentCount		��������
	 * @param	{Number}	iAllowComment		����Ȩ��
	 * @param	{String}	sBlogTitle			blog����
	 * @param	{String}	sBlogPermalink		blog�Ĺ̶����ӵ�ַ
	 */
	openComments: function (sBlogId, iCommentCount, iAllowComment, sBlogTitle, sBlogPermalink) {
		if ($('openCom_' + sBlogId).value == 2) {//������δ����
		  	$('openCom_' + sBlogId).value = 0; // ��ʾ�����Ѿ�����
		  	// ����NEBlog.gPermalink_Comments����ftl�й���������js���۶�������
		    this._showComments(NEBlog.gPermalink_Comments, sBlogId, this._oOptions.iHostId, iCommentCount, this._oOptions.iCommentRange, 
		    			this._oOptions.iGlobalAllowComment, iAllowComment, this._oOptions.iVisitorId, 
		    			this._oOptions.sVisitorName, this._oOptions.sVisitorNickname, this._oOptions.sVisitorAvatar, 
		    			this._oOptions.sHostName, this._oOptions.iVisitorRank, sBlogTitle, sBlogPermalink, 
		    			"comShow_" + sBlogId, "comPub_" + sBlogId);						
		}
		else {  // �����Ѿ����ɹ���, ֱ����ʾ����
			this._upDownComments(sBlogId, null);	
		}	
	},

	/**
	 * չ���͹ر�����
	 * @private
	 * @param	{String}	sBlogId		blog��id
	 * @param	{Object}	fnInit		��ʼ������	
	 * @return	{Void}
	 */
	_upDownComments: function(sBlogId, fnInit) {
		if ($('openCom_' + sBlogId).value == 0) {	
			this._closeAll(sBlogId);
			var _oSuccess = {success: false};
			this._iGid = 2;
			new Effect.BlindDown(
				'com_' + sBlogId, 
				{
					stateId:  sBlogId + "_$$S$$", 
					succObj:  _oSuccess, 
					duration: 0.5, 
					userCallBack: function(){
//						if (this._iGid != 2) 
//							this.closeComments(sBlogId); 
//						if(fnInit != null) 
//							fnInit();
					}.bind(this) 
				}
			);

			if (_oSuccess.success) {
				$('openCom_' + sBlogId).value = 1;		
			}else
				$('openCom_' + sBlogId).value = 0;	
		} else {
			this.closeComments(sBlogId);
			
		}
	},

	/**
	 * �ر�����
	 * @param	{String}	sBlogId		blog��id
	 * @return	{Void}
	 */
	closeComments: function(sBlogId) {
		if ($('openCom_' + sBlogId).value == 1) {	
			var _oSuccess = {success: false};
			new Effect.BlindUp('com_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSuccess, duration:0.5});
			if (_oSuccess.success) {
				$('openCom_' + sBlogId).value = 0;	
			}else
				$('openCom_' + sBlogId).value = 1;
		}
	},
	
	/**
	 * �򿪹ر�blog���Ĳ���
	 * @param	{String}	���Ķ�Ӧ��div��id
	 * @param	{String}	�򿪹ر����ĵļ�ͷid
	 * @param	{String}	�򿪵ļ�ͷͼƬ
	 * @param	{String}	�رյļ�ͷͼƬ
	 * @return	{Void}
	 * @see		Effect#BlindDown
	 * @see		Effect#Up
	 */
	show_hide: function(sShowId, sArrowId, sUpImg, sDownImg){
		//�Ѿ��������ť, ��Ϊ��ʾ��Ч����ʱ,��û��ʾ��.
		if (this._bShowHiding == true)
			return;
		var _oShow = $(sShowId);		
		if(_oShow.style.display=="none") {
			if (sArrowId != null)
				if (sUpImg == null)
					$(sArrowId).src = this._oOptions.sStyle + "/ico_up.gif";
				else
					$(sArrowId).src = this._oOptions.sStyle + "/" + sUpImg;
			this._bShowHiding = true;
			Effect.BlindDown(sShowId,{duration:0.1, userCallBack: function(){this._bShowHiding = false;}.bind(this)});
		}else {
	  		if (sArrowId != null)
	  			if (sDownImg == null)
					$(sArrowId).src = this._oOptions.sStyle + "/ico_down.gif";
				else
					$(sArrowId).src = this._oOptions.sStyle + "/" + sDownImg;
			this._bShowHiding = true;
	  		Effect.BlindUp(sShowId,{duration:0.1, userCallBack: function(){this._bShowHiding = false;}.bind(this)});
	  	}
	},


	/**
	 * �����־�Ƽ������Ȧ���Ƽ�
	 * @param	{String}	sBlogId			��־id
	 * @return	{Void}		
	 */
	_showRelateBlogCircle: function(sBlogId){
		if(sBlogId == null) // ��ǰδ����־
			return;
		/* for test purpose
		var _oList = [
						[{blogTitle:"title144444444444444444444444444444444242222222222222222444",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}},
						{blogTitle:"����23424242424244242444444444444444234222444444444423423424242444424",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}}],
						[{blogTitle:"��������444444444444444444444444444444444444444444444444444444444",circle:{name:"��������������������������������������������������������������"}},
						{blogTitle:"dddddd444444444444444444444444444444444444444444444444444444444444444444444444444ddd",circle:{name:"��������������������������������������������������������������"}}],
						[{blogTitle:"11111111111111111",circle:{name:"ee"}},{blogTitle:"�Ұ����й�",circle:{name:"ee"}},
						],[{blogTitle:"title144444444444444444444444444444444242222222222222222444",circle:{name:"������������������������������������������ɷ�"}},
						{blogTitle:"����23424242424244242444444444444444234222444444444423423424242444424",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}}],
						[{blogTitle:"title144444444444444444444444444444444242222222222222222444",circle:{name:"������������������������������������������ɷ�"}},
						{blogTitle:"����23424242424244242444444444444444234222444444444423423424242444424",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}}],
						[{blogTitle:"title144444444444444444444444444444444242222222222222222444",circle:{name:"������������������������������������������ɷ�"}},
						{blogTitle:"����23424242424244242444444444444444234222444444444423423424242444424",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}}]
					];
		var _oData = {relateCircles: _oList, circleBaseUrl: this._oOptions.sCircleBaseUrl};		
		var _sResult = NEBlog.PermaLinkPage.relateBlogCircleTemplate.process(_oData);

		$("relateBlogCircle_"+sBlogId).innerHTML = _sResult;
		*/
		BlogBean.getRelateBlogsCircles(sBlogId, this._oOptions.iHostId, {
			callback: function(oDataFromServer) {
				var _oList = oDataFromServer;
				var _oData = {relateCircles: _oList, circleBaseUrl: this._oOptions.sCircleBaseUrl};
				
				var _sResult = NEBlog.PermaLinkPage.relateBlogCircleTemplate.process(_oData);
				if(_sResult == ""){
					$("relateBlogCircle_"+sBlogId).style.display = "none";
				}else{
					$("relateBlogCircle_"+sBlogId).innerHTML = _sResult;
				}
			}.bind(this)
		});
	},
	
	/**
	 * �򿪹̶�����
	 * @param	{String}	sBlogId		blog id
	 * @param	{String}	sPermalink	blog���ӵ�ַ
	 * @return	{Void}
	 * @see		#closePermalink
	 */
	openPermalink :function(sBlogId, sPermalink) {
		if ($('openPerma_' + sBlogId).value == 0) {	
			this._closeAll(sBlogId);
			var _oSuccess = {success: false};
			this._iGid = 1;
			new Effect.BlindDown('perma_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSuccess , duration:0.5, 
								userCallBack: function() {
									if (this._iGid != 1) 
										this.closePermalink(sBlogId);
								}.bind(this) 
			});
			
			if (_oSuccess.success) {
				$('openPerma_' + sBlogId).value = 1;	
			}else
				$('openPerma_' + sBlogId).value = 0;				
			
		} else {
			this.closePermalink(sBlogId);
		}
	},
	/**
	 * �رչ̶�������ʾ
	 * @param	{String}	sBlogId		blog id
	 * @return	{Void}
	 * @see		Effect#BlindUp
	 */
	closePermalink :function(sBlogId) {
		if ($('openPerma_' + sBlogId).value == 1) {	
			var _oSuccess = {success: false};
			new Effect.BlindUp('perma_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSuccess, duration:0.5});
			if (_oSuccess.success) {
				$('openPerma_' + sBlogId).value = 0;	
			}
			else
				$('openPerma_' + sBlogId).value = 1;
		}
	},

	/**
	 * ������ͨ��
	 * @param	{String}	sBlogId			blog id
	 * @param	{String}	sTrackbackUrl	����ͨ���ַ
	 * @return	{Void}
	 * @see		#closeTrackbacks
	 * @see		#_closeAll
	 * @see		Effect#BlindUp
	 */
	openTrackbacks :function(sBlogId, sTrackbackUrl) {		
		if ($('openTrack_' + sBlogId).value == 2) {//������δ����	
			BlogBean.getTrackbacks(sBlogId, {
			  callback:function(dataFromServer) {
			  	this._openTrackbacksCB(dataFromServer, sTrackbackUrl, sBlogId);
			  }.bind(this)
			});
		}else {
			if ($('openTrack_' + sBlogId).value == 0) { //�����Ѿ�����
				this._closeAll(sBlogId);	
				var _oSuccess = {success: false};
				this._iGid = 3;
				new Effect.BlindDown('track_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSuccess, duration:0.5, 
					userCallBack: function(){
						if (this._iGid != 3) 
							this.closeTrackbacks(sBlogId);
						}.bind(this)
				});
				
				if (_oSuccess.success) {
					$('openTrack_' + sBlogId).value = 1;				
				}else
					$('openTrack_' + sBlogId).value = 0;				
			} else {
				this.closeTrackbacks(sBlogId);
			}
		}	
	},
	/**
	 * �ӷ���˻�ȡblog������ͨ���Ļص�������Ϊģ���������
	 * @param	{Object}	oTrackbacks		����ͨ���������
	 * @param	{String}	sTrackbackUrl	����ͨ���ַ
	 * @param	{String}	sBlogId			blog id
	 * @return	{Void}
	 * @see		#openTrackbacks
	 * @see		#_test4PB
	 * @see		Trimpath
	 */
	_openTrackbacksCB :function(oTrackbacks, sTrackbackUrl, sBlogId) {
		var _oData = {tbs: oTrackbacks, tbUrl: sTrackbackUrl, blogId: sBlogId, hostName: this._oOptions.sHostName,
					  style: this._oOptions.sStyle, objName: this._sObjectName, visitorName: this._oOptions.sVisitorName, hostId: this._oOptions.iHostId};
		var _sResult = NEBlog.PermaLinkPage.trackbacksTemplate.process(_oData);
		$("track_" + sBlogId).innerHTML = _sResult;
		$('openTrack_' + sBlogId).value = 0;
		this.openTrackbacks(sBlogId, sTrackbackUrl);
		
		if (this._oTester4PB != null) {
			if (oTrackbacks == null || oTrackbacks.length == 0) {
				this._test4PB("Tb", "null");
			} else {
				var _aTbId = trackbacks.pluck("id");
				this._test4PB("Tb", _aTbId);
			}
		}	
	},

	/**
	 * �ر�����ͨ��
	 * @param	{String}	sBlogId			blog id
	 * @return	{Void}
	 * @see		Effect#BlindUp
	 */
	closeTrackbacks :function(sBlogId) {
		if ($('openTrack_' + sBlogId).value == 1) {	
			var _oSuccess = {success: false};
			new Effect.BlindUp('track_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSuccess, duration:0.5});
			if (_oSuccess.success) {
				$('openTrack_' + sBlogId).value = 0;	
			}else
				$('openTrack_' + sBlogId).value = 1;
		}
	},

	/**
	 * ����̶����ӡ����ۺ�����ͨ��3��ҳ���д򿪵ģ���ر���
	 * @private
	 * @param	{String}	sBlogId			blog id
	 * @return	{Void}
	 * @see		#closePermalink
	 * @see		#closeComments
	 * @see		#closeTrackbacks
	 */
	_closeAll :function(sBlogId) {
		if ($('perma_' + sBlogId) != null &&
			$('openPerma_' + sBlogId).value == 1) {
			this.closePermalink(sBlogId);
		}
		else if ($('com_' + sBlogId) != null &&
			$('openCom_' + sBlogId).value == 1) {
			this.closeComments(sBlogId);
		} 
		else if ($('track_' + sBlogId) != null &&
			$('openTrack_' + sBlogId).value == 1) {
			this.closeTrackbacks(sBlogId);
		}
	},

	/**
	 * ת��tagҳ��
	 * @param	{Object}	oTag		tag����
	 * @param	{String}	sHostName	������ַ
	 * @return	{Void}
	 */
	searchTagObj :function(oTag, sHostName) {
		BlogBean.getHostAllTags({
		  callback:function(tags) {
		  	g_userTagList =  tags;
		    this._searchTagObjCB(oTag,sHostName);
		  }.bind(this)
		});	
		return false;
	},
	/**
	 * ��ѯtag����Ӧ����ת��ַ����ת
	 * @param	{Object}	oTag		tag����
	 * @param	{String}	sHostName	������ַ
	 * @return	{Boolean}	
	 * @see		#getTagObjByTagname
	 */
	_searchTagObjCB :function(oTag, sHostName) {
		
		var _oTag = getTagObjByTagname(oTag, -1, g_userTagList);
		if(_oTag==null)
			return false;
		//���ĳ�ȫ��������by mml
		window.open("http://blog.163.com/search/?t=tag&q=" + encodeURIComponent(_oTag.tagName) + "&o=blog");
					
		//location.href = "prevTag.do?host=" + sHostName + "&isGlobal=false&type=3&tagId=" + _oTag.id;
		return false;
	},
	/**
	 * ����
	 * @private
	 * @param	{String}	sKey		���Զ���ļ�
	 * @param	{String}	vValues		���Զ����ֵ
	 * @param	{String}	sRelValue	...
	 * @return	{Void}	
	 */
	_test4PB: function(sKey, vValues, sRelValue) {
		if (this._oTester4PB == null)
			return;
		switch (sKey) {
			case "Blog":
				this._oTester4PB.setSingle("Blog", vValues);
				break;
			case "Com":
				this._oTester4PB.setArray("Com", vValues);
				break;
			case "Tb":
				this._oTester4PB.setArray("Tb", vValues);
				break;
		}	
	},
	/**
	 * �ٱ�����
	 */
	reportBad:	function(report, postReportFunc) {
		PreUserReportBean.addUserReport(report, postReportFunc); 
	},
	
	
	/**
	 * ��ʾ����div add by gw
	 */	
	showShareDiv:function(aId ,permalink, title){
		var url = 'http://' + UD.hostName + '.blog.163.com/' + permalink;
		if(jsWindowManager == null)
			jsWindowManager = new NetEase.JSWindowManager();
		if(g_shareDiv == null){				  		
			g_shareDiv = new NetEase.ShareByEmail({aId:aId, jsWindowManager:jsWindowManager, visitorName:UD.visitorName,type:'blog', url:url,title:title}); 
	    }else{
	    	g_shareDiv.refreshNew({aId:aId, type:'blog', url:url,title:title});
	    }
	},
	
	upDownCssTabBar: function (sDivId){	
		var _sOpenedDivId = this._oBlogToolsUpDown;
		if(_sOpenedDivId==undefined || _sOpenedDivId==null || _sOpenedDivId=="") {
			//û�б�չ����, չ�������Div
			Element.addClassName(sDivId,"s");
			this._oBlogToolsUpDown = sDivId;
			Element.addClassName('blogCssTabBar',"bd1b");
		}else if(_sOpenedDivId == sDivId){
			//����Ѿ�չ����Div
			Element.removeClassName(_sOpenedDivId,"s");
			this._oBlogToolsUpDown = "";
			Element.removeClassName('blogCssTabBar',"bd1b");
		}else{
			//��tools����չ������Ŀ, ��չ��ͬһtools�е���һ��Ŀ
			Element.removeClassName(_sOpenedDivId,"s");
			Element.addClassName(sDivId,"s");
			this._oBlogToolsUpDown = sDivId;
		}
	},
	
	closeCssTabBarAll: function(sBlogId){
		this._oBlogToolsUpDown = "";
		Element.removeClassName('openComDiv' + sBlogId,"s");
		Element.removeClassName('openTbDiv' + sBlogId,"s");
		Element.removeClassName('openPermaDiv' + sBlogId,"s");
		Element.removeClassName('blogCssTabBar',"bd1b");
	},
	
	delComment: function(sCommentId, oParams, fnPostDelComment){
		BlogBean.deleteComment(sCommentId, oParams.blogId, {
			  callback:function(oDataFromServer) {
			    fnPostDelComment(oDataFromServer);
			  }
			});
	},
	
	afterDelComment: function(oParams){
		$("comCount_" + oParams.blogId).innerHTML = parseInt($("comCount_" + oParams.blogId).innerHTML)-1;
	}
}

var recentNumber = 5;
var serverName;
var gRecentComments;
var gStatusElemId;
function clickTBUrl(urlElemId, statusElemId) {
	if(copyText(urlElemId)){
		document.getElementById(statusElemId).style.display='inline';
		gStatusElemId = statusElemId;
		window.setTimeout(fadeStatus, 5000);
	}
}

function fadeStatus() {
	document.getElementById(gStatusElemId).style.display='none';
}

/*************************************************�ֺ�*************************************************/
function changeFont(sElemId, size) {
	if (size == 1) {
		if(Element.hasClassName(sElemId, "g_t_midle"))
			Element.removeClassName(sElemId, "g_t_midle");
		Element.addClassName(sElemId, "g_t_large");
	}else if (size == 2) {
		if(Element.hasClassName(sElemId, "g_t_large"))
			Element.removeClassName(sElemId, "g_t_large");
		Element.addClassName(sElemId, "g_t_midle");
	}else if (size == 3) {
		if(Element.hasClassName(sElemId, "g_t_midle"))
			Element.removeClassName(sElemId, "g_t_midle");
		if(Element.hasClassName(sElemId, "g_t_large"))
			Element.removeClassName(sElemId, "g_t_large");
	}
}
var CircleConst ={
	
	CIRCLE_PRIV_ADMIN:1, //Ȧ�ӹ���Ա
	CIRCLE_PRIV_NORMAL:2, //��ͨ�û�
	//�»�Ա����س���
	CIRCLE_PRIV_NEW: 3,//�»�Ա
	IS_IN_NEW_PERIOD:1000*60*60*24*7,//��ʱ��Ϊһ��֮�ڼ����Ϊ�»�Ա
	
	CIRCLE_STATUS_APPLIED:1, //Ȧ��״̬--������
	CIRCLE_STATUS_REJECTED:2, //Ȧ��״̬--���ܾ�
	CIRCLE_STATUS_SUCCESS:3, //Ȧ��״̬--������ɹ�
	
    CIRCLEUSER_STATUS_APPLIED:1, //Ȧ���û�״̬--������
	CIRCLEUSER_STATUS_REJECTED:2, //Ȧ���û�״̬--���ܾ�
	CIRCLEUSER_STATUS_SUCCESS:3, //Ȧ���û�״̬--������ɹ�
	CIRCLEUSER_STATUS_SECONDAPPLIED:4,//Ȧ���û�״̬--�ڶ���������
	CIRCLEUSER_STATUS_SECONDREJECT:5,//Ȧ���û�״̬--�ڶ��α��ܾ�������������
	
	
    CIRCLEBLOG_STATUS_APPLIED:1, //Ȧ����־״̬--������
	CIRCLEBLOG_STATUS_REJECTED:2, //Ȧ����־״̬--���ܾ�
	CIRCLEBLOG_STATUS_SUCCESS:3, //Ȧ����־״̬--������ɹ�


	CIRCLE_MODULE_CIRCLEINFO:1, //��ʾȦ����Ϣ��ģ��
	CIRCLE_MODULE_NEW_ARTICLES:2, //��ʾ����blog����ҳģ��
	CIRCLE_MODULE_HOT_ARTICLES:3, //��ʾ����blog����ҳģ��,������������
	CIRCLE_MODULE_RECOMMEND_ARTICLES:4, //��ʾ�Ƽ�blog����ҳģ��,������������
	CIRCLE_MODULE_HOT_MEMBERS:5, //��ʾȦ�������ŵ�Ȧ��, ������������
	CIRCLE_MODULE_ACTIVE_MEMBERS:6, //��ʾȦ�����Ծ��Ȧ��, ����־������
	CIRCLE_MODULE_RED_MEMBERS:7, //�Ƽ�Ȧ��(����ν�ĺ���)
	CIRCLE_MODULE_NEW_MEMBERS:8, //�¼����Ȧ��
	CIRCLE_MODULE_VISITSTAT:9, //����ͳ��
	CIRCLE_MODULE_BULLETIN:10, //Ȧ�ӹ���
	CIRCLE_MODULE_CUSTOMHTML_ADD:11, //�Զ���HTML
	CIRCLE_MODULE_CREATOR:13,//Ȧ������Ϣģ��
	
	CIRCLE_MODULE_BLOG_COLUMN:1000, //blogר��
	
	CIRCLE_MODULE_CUSTOM:10000, //�Զ���ģ��
	CIRCLE_MODULE_CUSTOMLIST:10001, //�Զ����б�ģ��
	CIRCLE_MODULE_CUSTOMHTML:10002, //�Զ���HTMLģ��
	
	CIRCLEBLOG_DEFAULT_BLOGNUM:10,//Ĭ��ȡ��BLOG����

    CIRCLE_MEMBER_PAGE_RANGE: 20, //ÿҳ��ʾ��Ȧ����
    CIRCLE_BLOG_PAGE_RANGE: 20, //ÿҳ��ʾ����־��
    CIRCLE_BLOG_PREV_PAGE_RANGE: 20, //Ԥ��ʱÿҳ��ʾ����־��
    CIRCLE_MEMBER_PREV_PAGE_RANGE: 20, //Ԥ��ʱÿҳ��ʾ����־��

    CIRCLE_MAP_PAGE_RANGE: 50, //Ȧ�ӵ�ͼÿҳ��ʾ��Ȧ����
    
    BLOGS_SHOW_SIZE: 300, //�ڲ鿴���¡����ŵȵ�blog����ʾ����
    MEMBERS_SHOW_SIZE: 300, //�ڲ鿴���¡����ŵȵĻ�Ա����ʾ����

	//Ȧ�Ӽ����״̬
	CIRCLE_JOIN_SUCCESS:1,//�ɹ�
	CIRCLE_JOIN_ALREADY_MEMBER:2,//�Ѿ���Ȧ����
	
	CIRCLE_KIND_PUBLIC:1,//����
	CIRCLE_KIND_PRIVATE:2,//˽��Ȧ��

	BLOG_RSS: 1,
	RESOURCELIST_RSS: 2,
	
	RANK_OWNER: 10000,
	RANK_ADMIN: 100,
	RANK_GUEST: 0,
	RANK_ANONYMOUS: -100,
	RANK_NESUSER: -90,
	RANK_UNKNOWN: 999999,

	//Ȧ�����õ�һЩĬ��ֵ
	DEFAULT_COLOR : "-1",
    DEFAULT_FONT : "����",
    DEFAULT_ALLOW_COMMENT : false,
    DEFAULT_BORDER_STYLE : 0,
    DEFAULT_BORDER_WIDTH : 1,
    DEFAULT_PIC_REPEAT : 0,
    DEFAULT_PIC_POS : 0,
	
	//����ͼƬ��Ĭ�ϵ�ַ�������CircleConst.java����Ĳ�̫һ������Ϊ������
	//����aop����������ǰ׺�ͺ�׺�ģ���CircleConst�������dao�㣬���Լ��Щ
	NO_LOGO_PIC:"/photo/-4000.jpg",
	NO_BIG_PIC:"/photo/-3000.jpg",
	NO_BACK_PIC:"/photo/-2000.jpg",
	NO_LINK_PIC:"/photo/-5000.jpg"
	
}

var BlogsUtil={
    getBlogRankHtml: function(rank){
        var rankHtml="";
        for (var i=0;i<rank;i++){
            rankHtml+="<img src='/style/common/icn_star.gif'/>";
        }
        for (var i=rank;i<5;i++){
            rankHtml+="<img src='/style/common/icn_star_grey.gif'/>";
        }
        return rankHtml;
    },
    getBlogRankUpdateHtml: function(circleId, blogId, rank){
        var rankHtml="";
        for (var i=0;i<rank;i++){
        	var curRank=i+1;
            rankHtml+="<img id='rank"+curRank+"' onclick='RankAdaptor.changeRank("+circleId+","+blogId+","+curRank+")' style='cursor:pointer' src='/style/common/icn_star.gif'/>";
        }
        for (var i=rank;i<5;i++){
        	var curRank=i+1;
            rankHtml+="<img id='rank"+curRank+"' onclick='RankAdaptor.changeRank("+circleId+","+blogId+","+curRank+")' style='cursor:pointer' src='/style/common/icn_star_grey.gif'/>";
        }
        return rankHtml;
    }
}

var CircleUtil={
    circlePrivs: [
        {id: CircleConst.CIRCLE_PRIV_ADMIN, name:"����Ա"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL, name:"��ͨȦ��"}
    ],
    circleKinds: [
        {id: CircleConst.CIRCLE_KIND_PUBLIC, name:"����"},
        {id: CircleConst.CIRCLE_KIND_PRIVATE, name:"˽��"}
    ],
    circlePrivImgs: [
        {id: CircleConst.CIRCLE_PRIV_ADMIN, name:"<img src='/style/common/icn_boss.gif' title='����Ա'/>"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL, name:"<img src='/style/common/icn_member.gif' title='��ͨȦ��'/>"}
    ],
    circlePrivImgsInOne: [
    	{id: CircleConst.CIRCLE_PRIV_ADMIN, name:"<img src='/style/common/icn_boss.gif' title='����Ա' />"},
    	{id: CircleConst.CIRCLE_PRIV_ADMIN+10, name:"<img src='/style/common/icn_bosspop.gif' title='����Ա �Ƽ�' />"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL, name:"<img src='/style/common/icn_member.gif' title='��ͨȦ��'/>"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL+10, name:"<img src='/style/common/icn_memberpop.gif' title='��ͨȦ�� �Ƽ�'/>"},
        {id: CircleConst.CIRCLE_PRIV_NEW, name:"<img src='/style/common/icn_newman.gif' title='��Ȧ��' />"}
    ],
    circlePrivImgsInBG: [
    	{id: CircleConst.CIRCLE_PRIV_ADMIN, name:"m8",hint:"����Ա"},
    	{id: CircleConst.CIRCLE_PRIV_ADMIN+10, name:"m8",hint:"����Ա �Ƽ�"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL, name:"m7b",hint:"��ͨȦ��"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL+10, name:"m7b",hint:"��ͨȦ�� �Ƽ�"},
        {id: CircleConst.CIRCLE_PRIV_NEW, name:"m7b",hint:"��Ȧ��"}
    ],
    circlePrivHint: [
    	{id: CircleConst.CIRCLE_PRIV_ADMIN, name:"����Ա"},
    	{id: CircleConst.CIRCLE_PRIV_ADMIN+10, name:"����Ա �Ƽ�"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL, name:"��ͨȦ��"},
        {id: CircleConst.CIRCLE_PRIV_NORMAL+10, name:"��ͨȦ�� �Ƽ�"},
        {id: CircleConst.CIRCLE_PRIV_NEW, name:"��Ȧ��"}
    ],
    circleUserStatus: [
        {id: CircleConst.CIRCLEUSER_STATUS_APPLIED, name:"��������"},
        {id: CircleConst.CIRCLEUSER_STATUS_REJECTED, name:"���ܾ�"},
        {id: CircleConst.CIRCLEUSER_STATUS_SUCCESS, name:"����ɹ�"},
        {id: CircleConst.CIRCLEUSER_STATUS_SECONDAPPLIED, name:"�ٴ�����"},
        {id: CircleConst.CIRCLEUSER_STATUS_SECONDREJECT, name:"�ٴα���"}
    ],
    blogStatus: [
        {id: CircleConst.CIRCLEBLOG_STATUS_APPLIED, name:"δ���"},
        {id: CircleConst.CIRCLEBLOG_STATUS_REJECTED, name:"���ܾ�"},
        {id: CircleConst.CIRCLEBLOG_STATUS_SUCCESS, name:"���ͳɹ�"}
    ],
    blogRanks: [
        {id: 0, name:BlogsUtil.getBlogRankHtml(0)},
        {id: 1, name:BlogsUtil.getBlogRankHtml(1)},
        {id: 2, name:BlogsUtil.getBlogRankHtml(2)},
        {id: 3, name:BlogsUtil.getBlogRankHtml(3)},
        {id: 4, name:BlogsUtil.getBlogRankHtml(4)},
        {id: 5, name:BlogsUtil.getBlogRankHtml(5)}
    ],
    getCircleKindStr: function(circleKindId){
    	return IdToName.convert(circleKindId, CircleUtil.circleKinds);
    },
    getUserPrivName: function(privilege){
    	return IdToName.convert(privilege, CircleUtil.circlePrivs);
    },
    getUserPrivImg: function(privilege){
    	return IdToName.convert(privilege, CircleUtil.circlePrivImgs);
    },
    getUserPrivImgInOne: function(privilege, inRedList, joinDate){
    	var red;
    	if(inRedList)
            red=new Number(10);
    	else 
            red=new Number(0);
    	var newPriv=new Number(privilege)+red;
    	//if(newPriv==CircleConst.CIRCLE_PRIV_NORMAL){
    	//������Ȧ�ѼȲ��ǹ���ԱҲ�����Ƽ��ģ���ô������ͨȦ�ѡ����ʱ����
    	//�鿴�ǲ����¼ӵ�Ȧ�ѣ����¼ӵ�Ȧ����newPriv��Ϊ����Ȧ�ѡ���Ӧ��id
    	//Ҳ����˵������Ա���Ƽ�Ȧ�ѵ�ͼ������������Ȧ�ѵ�ͼ���
    	//	var joinTime=joinDate.getTime();
    	//	var nowTime=new Date();
    	//	if(nowTime.getTime()-joinTime < CircleConst.IS_IN_NEW_PERIOD)
    	//		newPriv = CircleConst.CIRCLE_PRIV_NEW;
    	//}
    	return IdToName.convert(newPriv, CircleUtil.circlePrivImgsInBG);
    },
    getUserPrivHint: function(privilege, inRedList, joinDate){
    	var red;
    	if(inRedList)red=new Number(10);
    	else red=new Number(0);
    	var newPriv=new Number(privilege)+red;
    	return IdToName.convert(newPriv, CircleUtil.circlePrivHint);
    },
    getBlogStatus: function(status){
    	return IdToName.convert(status, CircleUtil.blogStatus);
   },
    getBlogRankHtml: function(rank){
    	return IdToName.convert(rank, CircleUtil.blogRanks);
   },
   getBlogRankUpdateHtml: function(circleId, blogId, rankId){
   		return BlogsUtil.getBlogRankUpdateHtml(circleId, blogId, rankId);	
   },
   getUserStatus: function(status){
    	return IdToName.convert(status, CircleUtil.circleUserStatus);
   },
   getColumn: function(columnId){
    	return IdToName.convert(columnId, CircleUtil.circleColumns);
   }
}

var SpaceInfo={
    init: function(spaceBaseUrl){
        SpaceInfo.baseUrl=spaceBaseUrl;
    }
}

var CirclePageTitle={
    set: function(title){
        $("titletext").innerHTML=title;
    }
}

var CircleInfo={
    baseUrl: "http://q.163.com",
   init: function(circleId, style,  callback){
        CircleInfo.circleId=circleId;
        CircleInfo.style=style;
        CircleBean.getCircleColumns(circleId, function(circleColumns){
            CircleInfo.circleColumns=circleColumns;
            if (callback!=null){
                callback();
            }
        });
   },
   getColumn: function(columnId){
        var circleColumn=CircleInfo.circleColumns.find( function(curColumn){
           return curColumn.id==columnId; 
        });
        if (null==circleColumn){
        	alert("error columnId: "+columnId);
        	return "";
        }
        return circleColumn;
   },
   getColumnByName: function(columnName){
        var circleColumn=CircleInfo.circleColumns.find( function(curColumn){
           return curColumn.name==columnName; 
        });
        return circleColumn;
   },
    getCircleBlogLink: function(circleUrlName, userName, permalink){
        var permaPrefix="blog/static/";
        if (permalink.indexOf(userName+"/"+permaPrefix)==0){
            permaPrefix=userName+"/"+permaPrefix;
        }
        var permaPrefixLength=permaPrefix.length;
        var permaSerial=permalink.substring(permaPrefixLength);
        return CircleInfo.baseUrl+"/"+circleUrlName+"/blog/"+userName+"/"+permaSerial;
    }
}

var CircleBlogPushInfo={
    notPushedCircles: [],
    init: function(blogId, profileId){
        CircleBlogPushInfo.blogId=blogId;
        CircleBlogPushInfo.profileId=profileId;
    },
    addNotPushedCircle: function(circle){
        CircleBlogPushInfo.notPushedCircles.push(circle);
    },
    getCirclesByType1: function(type1Id){
        var circles=CircleBlogPushInfo.notPushedCircles.findAll( function(curCircle){
            return curCircle.circleType1Id==type1Id;
        });
        return circles;
    },
    getPrefferdType1Id: function(){
    }
}

/**
 * ��־ģ���������б�
 * @type String
 */
var jst_blog_edit_class = new String('\
		<div class="g_h_20 b"><a id="addClass" class="c05" href="javascript:;" onclick="${objectName}.showClsAddDiv(\'add\', \'addClass\', -1, -1);"><span class="n_ e10_1 c05">&nbsp;</span>��ӷ���</a></div>\
    {if classes != null && classes.length != 0}\
    {for cls in classes}\
    <div class="g_h_18 g_htc_hvr i c06">\
    	 {if (pageName == "editBlogAll")}\
      	<p  class="g_t_hide g_htc_item {if selId != null && cls.id == selId} g_htc_item_selected{/if}" id="pBlogCls${cls.id}"><em>&#149;</em><a id="editClass${cls.id}" href="#" onclick="${parentName}.openBlogsByClass(\'${cls.id}\', \'${cls.className}\', ${cls.blogCount});return false;">${cls.className|escape}(${cls.blogCount})</a></p>\
      {else}\
      	<p  class="g_t_hide g_htc_item {if selId != null && cls.id == selId} g_htc_item_selected{/if}" ><em>&#149;</em><a id="editClass${cls.id}" href="${hostPath}/editBlogAll.do?p1=cls&p2=\'${cls.id}\'&p3=${cls.blogCount}">${cls.className|escape}(${cls.blogCount})</a></p>\
      {/if}\
      <span class="n_ n6 g_c_hand d" title="ɾ��" onclick="${objectName}.onClassDel(\'${cls.id}\', \'${cls.className|escape}\');">&nbsp;</span>\
		 	  <span class="n_ e7 g_c_hand d" title="�༭" onclick="${objectName}.showClsAddDiv(\'edit\', \'editClass${cls.id}\', -1, -1, \'${cls.id}\');">&nbsp;</span>\
    </div>\
    {/for}\
    {else}\
    	 &nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû�з���\
    {/if}\
');
/**
 * ��־ģ�����鵵�б�
 * @type String
 */
var jst_blog_edit_arch = new String('\
    {if yearArchs != null && yearArchs.length != 0}\
    {for yearArch in yearArchs}\
    	{if (yearArch_index==0 && sel != "arch") || (selId.toString().length >= 4 && (yearArch.year == selId.toString().substring(0,4)))}\
      <div id="divYearArch${yearArch.year}" class="g_htc_toggle g_h_20 g_c_hand g_t_left c05" onclick="${objectName}.showHideArch(\'${yearArch.year}\');"><span class="n_ n0 ck0">&nbsp;</span><span class="n_ n1 ck1">&nbsp;</span>${yearArch.year}��</div>\
    	{else}\
      <div id="divYearArch${yearArch.year}" class="g_htc_toggle g_h_20 g_c_hand g_t_left c05" onclick="${objectName}.showHideArch(\'${yearArch.year}\');"><span class="n_ n0 ck1">&nbsp;</span><span class="n_ n1 ck0">&nbsp;</span>${yearArch.year}��</div>\
    	{/if}\
      <div id="uYearArch${yearArch.year}" class="g_menu_07 c06" {if (!((yearArch_index==0 && sel != "arch") || (selId.toString().length >= 4 && (yearArch.year == selId.toString().substring(0,4)))))} style="display:none;"{/if}>\
        {for monthArch in yearArch.archives}\
        	{if (pageName == "editBlogAll")}\
          	<p class="g_t_hide g_h_18" id="pMonthArch${monthArch.year}_${monthArch.month}">\
          	<a href="#" {if selId != null && selId == monthArch.year + "-" + monthArch.month + "-01"} class="g_htc_item g_htc_item_selected" {else} class="g_htc_item"{/if}  onclick="${parentName}.openBlogsByArchive(\'${monthArch.toStandardStr()}\', \'${monthArch.year}-${monthArch.month}\', ${monthArch.count});return false;">${monthArch.month}��(${monthArch.count})</a></p>\
          {else}\
          	<p class="g_t_hide g_h_18">\
          	<a href="${hostPath}/editBlogAll.do?p1=arch&p2=\'${monthArch.toStandardStr()}\'&p3=${monthArch.count}" \
          		{if selId != null && selId == monthArch.year + "-" + monthArch.month + "-01"} class="g_f_init_select"{/if}>${monthArch.month}��(${monthArch.count})</a></p>\
          {/if}\
        {/for}\
      </div>\
    {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû�д浵\
    {/if}\
');

/**
 * ��־ģ����������б�, ���༭״̬��
 * @type String
 */
var jst_blog_edit_rcntcom = new String('\
    {if comments != null && comments.length != 0}\
      {for com in comments}\
        <div>\
        <p class="g_t_hide g_h_18 c05"><em>'+jst_global_sign+'</em>\
        	{if com.publisherName != ""}<a class="g_p_inline" href="http://${com.publisherName|parentDomain}/" target="_blank">${com.publisherNickname|escape}</a>\
        	{else}${com.publisherNickname|escape}{/if}:\
        </p>\
        <p class="g_t_hide g_h_18 in c07"><a href="${hostPath}/getBlog.do?bid=${com.blogId}">${com.content|substring:0,20|default:""|escape}</a></p>\
		</div>\
      {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû������\
    {/if}\
');    

/**
 * ��־�༭���������ģ��
 * @type String
 */
var jst_blog_edit_com = new String('\
    {for com in coms}\
    <div class="bd1b g_c_mvdn g_c_mvup">\
      <div class="g_h_20">\
        <div class="g_p_left g_c_hpdin g_w_60 g_t_hide g_t_left c06"><label class="c09">������:&nbsp;</label>\
        {if com.publisherName != ""}\
        <a href="http://${com.publisherName|parentDomain}" target="_blank">${com.publisherNickname}</a>\
        {else}\
        ${com.publisherNickname}\
        {/if}\
        </div>\
        <div class="g_p_right g_w_15 g_t_center"><span id="delcom${com.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteComment(\'${com.id}\');return false;" title="ɾ������">&nbsp;</span></div>\
        <div class="g_p_right g_w_20 g_t_center c09">${NetEase.DateTime.formatRecentDate(com.publishTime,"MM��dd�� HH:mm")}</div>\
      </div><div class="g_p_clear g_t_space">&nbsp;</div>\
      <div class="g_t_left g_c_pdin g_w_95 g_t_wrap c07">${com.content}</div>\
    </div>\
    {/for}\
');


var jst_blog_edit_trackback = new String('\
    {for tb in tbs}\
    <div class="bd1b g_c_mvdn g_c_mvup">\
      <div class="g_h_20">\
        <div class="g_p_left g_c_hpdin g_w_60 g_t_hide g_t_left c05"><a href="${tb.referBlogUrl}">${tb.referBlogTitle|default:""}</a></div>\
        <div class="g_p_right g_w_15 g_t_center"><span id="deltb${tb.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteTrackback(\'${tb.id}\');return false;" title="ɾ������">&nbsp;</span></div>\
        <div class="g_p_right g_w_20 g_t_center c09">${NetEase.DateTime.formatRecentDate(tb.referTime,"MM��dd�� HH:mm")}</div>\
      </div>\
      <div class="g_p_clear g_t_space">&nbsp;</div>\
    </div>\
    {/for}\
');


/**
 * ��־Ԥ��ģ���������б�
 * @type String
 */
var jst_blog_prev_class = new String('\
  	{if classes != null && classes.length != 0}\
  	{for cls in classes}\
	   	{if (pageName == "prevBlog")}\
	  	<p class="g_t_hide g_h_18" id="blogClassId${cls.id}"><em>&#149;</em><a href="#" onclick="applySelectCss(\'blogClassId${cls.id}\');${parentName}.openBlogsByClass(\'${cls.id}\', \'${cls.className|escape|js_string}\', ${classBlogCount[cls_index]});return false;">${cls.className|escape}(${classBlogCount[cls_index]})</a></p>\
	  	{else}\
	  	<p class="g_t_hide g_h_18" ><em>&#149;</em><a href="${hostPath}/prevBlog.do?clsId=${cls.id}&class=">${cls.className|escape}(${classBlogCount[cls_index]})</a></p>\
	  	{/if}\
  	{/for}\
  	{else}\
  	&nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû�з���\
  	{/if}\
');

/**
 * ��־Ԥ��ģ�����浵�б�
 * @type String
 */
var jst_blog_prev_arch = new String('\
    {if yearArchs != null && yearArchs.length != 0}\
    {for yearArch in yearArchs}\
    {if yearArch_index==0}\
      <div class="g_h_20 g_c_mvdn g_c_hand g_t_left n_ n1 c06" id="updown${yearArch.year}" onclick="${objName}.show_hide(\'yearArch${yearArch.year}\', \'updown${yearArch.year}\', true);return false;">${yearArch.year}��</div>\
      {else}\
      <div class="g_h_20 g_c_mvdn g_c_hand g_t_left n_ n0 c06" id="updown${yearArch.year}" onclick="${objName}.show_hide(\'yearArch${yearArch.year}\', \'updown${yearArch.year}\', true);return false;">${yearArch.year}��</div>\
      {/if}\
      <div id="yearArch${yearArch.year}" class="g_menu_07 c06" {if yearArch_index > 0}style="display:none;"{/if}>\
        {for monthArch in yearArch.archives}\
        	{if (pageName == "prevBlog")}\
          	<p class="g_t_hide g_h_18" id="monthArch${monthArch.year}_${monthArch.month}"><a href="#" onclick="applySelectCss(\'monthArch${monthArch.year}_${monthArch.month}\');${parentName}.openBlogsByArchive(\'${monthArch.toStandardStr()}\', \'${monthArch.toString()}\', ${monthArch.count});return false;">${monthArch.month}��(${monthArch.count})</a></p>\
          {else}\
          	<p class="g_t_hide g_h_18" id="monthArch${monthArch.year}_${monthArch.month}"><a href="${hostPath}/prevBlog.do?archive=${monthArch.toStandardStr()}">${monthArch.month}��(${monthArch.count})</a></p>\
          {/if}\
        {/for}\
      </div>\
    {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû�д浵\
    {/if}\
');    



var jst_blog_com_editall = new String('\
		{for com in comments}\
			<div id="ul_${blogId}" class="bdt g_c_mvdn">\
			 <div class="g_h_25">\
				 <div class="g_p_left g_c_hpdin g_w_70 g_t_hide g_t_left">\
					 <label class="c09">������:&nbsp;</label>\
					 {if com.publisherName!=null && com.publisherName != ""}<a class="c06" href="http://${com.publisherName|parentDomain}/" target="_blank">${com.publisherNickname|default:""|escape}</a>\
				 	 {else}${com.publisherNickname|default:""|escape}{/if}\
				 </div>\
				 <div class="g_p_right g_w_10 g_t_center"><span id="delcom_${com.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteComment(\'${com.id}\', \'${blogId}\');return false;" title="ɾ������">&nbsp;</span></div>\
				 <div class="g_p_right g_w_15 g_t_center c09">${NetEase.DateTime.formatRecentDate(com.publishTime,"MM��dd�� HH:mm")}</div>\
			 </div><div class="g_p_clear g_t_space">&nbsp;</div>\
			 <div class="g_t_left g_c_pdin g_w_95 g_t_wrap c07">${com.content|default:""}</div>\
		 </div>\
		{/for}\
');

var jst_blog_editall_trackback = new String('\
	{for tbs in trackbacks}\
	<div class="g_c_mvlft" id="ulTrackback_${blogId}">\
		 <div class="g_h_25 bdt">\
			 <div class="g_p_left g_c_hpdin g_w_70 g_t_hide g_t_left c07"><a href="${tbs.referBlogUrl}">${tbs.referBlogTitle|escape}</a></div>\
			 <div class="g_p_right g_w_10 g_t_center"><span id="deltb_${tbs.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteTrackback(\'${tbs.id}\', \'${blogId}\');return false;" title="ɾ������">&nbsp;</span></div>\
			 <div class="g_p_right g_w_15 g_t_center c09">${NetEase.DateTime.formatRecentDate(tbs.referTime,"MM��dd�� HH:mm")}</div>\
		 </div><div class="g_p_clear g_t_space">&nbsp;</div>\
	 </div>\
	 {/for}\
');
 
/**
 * Ԥ����־�б�
 * @type String
 */
var jst_blog_prev_list = new String('\
    {if blogs != null && blogs.length > 0}\
    {for b in blogs}\
    {if b_index < blogRange}\
    <div class="g_c_pdin item" id="blog_${b.id}">\
      <div class="g_title_00 g_t_bold g_p_2_height g_c_hand selitm" onclick="${objName}.show_hide_each_blog(\'${b.id}\', \'blogContent_\', \'classArrow_\');" title="�۵�/չ����־����">\
      	<span class="g_t_14 g_t_left g_w_90 g_t_hide c07" id="divBlogTitle${b.id}">${b.title|default:""|escape}</span>\
      	<div class="n_ n2" id="classArrow_${b.id}">&nbsp;</div>\
      </div>\
      <div id="blogContent_${b.id}" style="display:none;">\
	      <div class="g_title_00 g_c_pdin">\
	        <span class="g_t_left g_w_80 g_t_hide c08">\
	          {if b.className != null && b.className != ""}\
	             <label>����:&nbsp;</label>\
	             <a id="aBelongCls${b.id}" class="c06" href="#" onclick="${objName}.openSameClass(\'${b.classId}\', \'${b.className|escape|js_string}\');">${b.className|escape}</a>\
	          {/if}\
	          {if b.className != null && b.className != "" && b.tag != null && b.tag != ""}<nobr class="bd1c">&nbsp;|&nbsp;</nobr>{/if}\
	          {if b.tag != null && b.tag != ""}\
	             <label>��ǩ:&nbsp;</label>\
	             {for t in b.tagArray}{if t_index != 0}&nbsp;{/if}<a class="c06" href="#" onclick="${objName}.searchTagObj(\'${t|escape|js_string}\', false);return false;">${t|escape}</a>{if t_index < b.tagArray.length - 1},{/if}{/for}\
	          {/if}\
	        </span>\
	        <div class="c08">�ֺ�&nbsp;[\
	          <a id="aFontLarge${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 1);return false;">��</a>&nbsp;\
	          <a id="aFontMedium${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 2);return false;">��</a>&nbsp;\
	          <a id="aFontSmall${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 3);return false;">С</a>]\
	        </div>\
	      </div>\
	      <div class="g_c_pdin g_t_left c07 content" id="blogtext_${b.id}"></div>\
	      <div class="g_t_center"><div id="relateBlogCircle_${b.id}" class="g_t_left g_p_center" style="width:95%;"></div></div>\
      </div>\
      <div class="g_tab_btn00 g_t_left g_c_mvdn g_h_18" id="cssTabBar_${b.id}">\
        <div class="c08">${b.accessCount}���Ķ�</div>\
        <div class="bd1l bd1r" id="openPermaDiv${b.id}"><a id="aOpenPerma${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openPermaDiv${b.id}\');${objName}.openPermalink(\'${b.id}\', \'${b.permalink}\');return false;">�̶�����<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="bd1l bd1r"><a id="share${b.id}" class="c05" href="#" onclick="${objName}.showShareDiv(\'${b.id}\', \'${b.permalink}\');return false;">����</a></div>\
        <div class="bd1l bd1r" id="openTbDiv${b.id}"><a id="aOpenTb${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openTbDiv${b.id}\');${objName}.openTrackbacks(\'${b.id}\', \'${b.trackbackUrl}\');return false;">���� (${b.trackbackCount})<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="bd1l bd1r" id="openComDiv${b.id}"><a id="aOpenCom${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openComDiv${b.id}\');${objName}.openComments(\'${b.id}\', ${b.commentCount}, \'${b.title|escape|js_string}\', \'${b.permalink}\');return false;">���� (<nobr id="comCount_${b.id}">${b.commentCount}</nobr>)<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="c09">��${NetEase.DateTime.formatDate(b.publishTime,"YYYY-MM-dd HH:mm")}</div>\
        <input id="openPerma_${b.id}" type="hidden" value="0"/><!--0��ʾ�رգ�1��ʾ��-->\
	    <input id="openCom_${b.id}" type="hidden" value="2"/><!--0��ʾ�رգ�1��ʾ�򿪣�2��ʾ����δ����-->\
	    <input id="openTrack_${b.id}" type="hidden" value="2"/><!--0��ʾ�رգ�1��ʾ�򿪣�2��ʾ����δ����-->\
      </div><div class="g_p_clear g_t_space">&nbsp;</div>\
	  <div class="g_t_left" id="perma_${b.id}" style="display:none;">\
	    <div class="g_h_20 g_c_mvdn"><span id="aClosePerma${b.id}" class="g_p_right g_c_hand n_ n7" onclick="${objName}.closeCssTabBarAll(\'${b.id}\');${objName}.closePermalink(\'${b.id}\');return false;" title="�ر�">&nbsp;</span></div>\
		<div class="g_c_pdin">\
		  <div class="c08">���ĵĹ̶���������:&nbsp;&nbsp;<span id="permCopyFinished_${b.id}" class="n_ f17" style="display:none;">�����������ӳɹ�</span></div>\
		  <div>\
		    <a id="aPerma${b.id}" class="c06" href="http://${hostName|parentDomain}/${b.permalink}" target="_blank">http://${hostName|parentDomain}/${b.permalink}</a>&nbsp;\
			<a id="copyPerma${b.id}" class="g_c_button bd01 butn c05" onclick="clickTBUrl(\'aPerma${b.id}\', \'permCopyFinished_${b.id}\')" title="������������">������</a>\
		  </div>\
		</div>\
	  </div>\
      <div id="com_${b.id}" class="g_p_relative g_h_1" style="display:none;">\
	     <div id="comShow_${b.id}"></div>\
	  	 <div id="comPub_${b.id}" class="g_h_1"></div>\
	  </div>\
	  <div id="track_${b.id}" class="g_t_left" style="display:none;"></div>\
    </div>\
    {/if}\
    {/for}\
    {else}\
      <div class="g_c_pdin">\
	     {if loadType == "class"}\
	      	 �÷���������־��\
	     {elseif loadType == "archive"}\
	      	 �ù鵵������־��\
	     {else}\
			 ������־��\
	     {/if}\
	  </div>\
    {/if}\
');    

/**
 * 
 */
var jst_blog_edit_list = new String('\
		{if blogs != null && blogs.length > 0}\
    <div class="g_c_container">\
      <table border="0" cellspacing="0" cellpadding="0">\
        <tr class="c09"><td class="g_w_60 g_t_left c09">����</td><td class="g_w_15 g_t_left c09">���</td><td class="g_w_15 c09 g_t_center">����ʱ��</td><td class="g_w_10 c09 g_t_center">ɾ��</td></tr>\
        {for b in blogs}\
        <tr class="g_htc_selitm">\
          <td class="g_t_left g_t_hide c05"><a href="${hostPath}/blog/getBlog.do?bid=${b.id}">${b.title|escape}</a></td>\
          <td class="g_t_left g_t_hide c08">{if b.className != null && b.className != ""}${b.className|escape}{/if}</td>\
          <td class="g_t_center c09">${NetEase.DateTime.formatRecentDate(b.publishTime,"YYYY�� MM��dd�� HH:mm")}\
      			{if (b.isPublished == 0 && (b.valid == 0 || b.valid == 4))}<br/><b>�ݸ�</b>\
      			{elseif (b.isPublished == 1 && b.valid == 16)}<br/><b>δ�������д�ϵͳ�����</b>\
      			{elseif (b.isPublished == 1 && b.valid == 24)}<br/><b>δ�������д�ϵͳ�����</b>\
      			{elseif (b.isPublished == 1 && b.valid == 25)}<br/><b>��˲�ͨ��</b>\
      			{elseif (b.valid == 26)}<br/><b>�ѱ����Σ����������Ķ�</b>\
      			{/if}</td>\
          <td class="g_t_center"><span id="delblog_${b.id}" class="g_c_hand n_ n6" title="ɾ��blog" onClick="${objectName}.deleteBlog(\'${b.id}\', ${b.isPublished}, ${b.valid}, ${b.publishTime}, ${b.allowView}, \'${b.classId}\');return false;">&nbsp;</span></td>\
        </tr>\
        {if ((b.isPublished == 1) && (b.commentCount > 0 || b.trackbackCount > 0))}\
        <tr>\
        	<td colspan="4" class="g_t_left g_c_lmvlft">\
        	{if b.commentCount > 0}\
        	<input id="open_${b.id}" type="hidden" value="0"/>\
        	<div id="blogshowcomment_${b.id}">\
							<div><a class="g_p_left g_htc_toggle" href="javascript:;" onclick="${objectName}.switchComments(\'${b.id}\', ${b.commentCount});return false;">\
								<span id="imgCom${b.id}"><span class="ck0 n_ n4">&nbsp;</span><span class="ck1 n_ n5">&nbsp;</span></span>����:<nobr id="comCount_${b.id}">${b.commentCount}</nobr>&nbsp;&nbsp;</a>\
								<div id="comPageNav_${b.id}" class="g_p_left g_w_30"></div>\
								<div class="g_p_clear g_t_space">&nbsp;</div>\
							</div>\
							<div class="g_c_mvlft" id="_$_com_editall_${b.id}" style="display:none;"></div>\
					</div>\
        	{/if}\
        	{if b.trackbackCount > 0}\
	        	<div>\
					<div id="tbsdiv_${b.id}">\
						<a class="g_htc_toggle" href="javascript:;" onclick="${objectName}.switchTrackback(\'${b.id}\');return false;">\
							<span id="imgTb${b.id}"><span class="ck0 n_ n4">&nbsp;</span><span class="ck1 n_ n5">&nbsp;</span></span>����:<nobr id="tbCount_${b.id}">${b.trackbackCount}</nobr></a>\
						<input id="open2_${b.id}" type="hidden" value="0"/>\
						<div class="g_c_mvlft" id="_$_tb_editall_${b.id}" style="display:none;"></div>\
					</div>\
				</div>\
        	{/if}\
        	</td>\
        </tr>\
        {/if}\
        {/for}\
      </table>\
    </div>\
    {else}\
    <div class="g_c_container">\
	  		{if loadType == "class"}\
	      		û�и÷������־��\
	      {elseif loadType == "archive"}\
      			û�иù鵵��������־��\
	      {else}\
	      		������־���ɵ��"�����־"�������־���ݡ�\
	      {/if}\
  	</div>\
    {/if}\
');

/**
 * Ԥ��ҳ������ͨ��
 */
var jst_blog_prev_track = new String('\
	<div class="g_h_20 g_c_mvdn"><span class="g_p_right g_c_hand n_ n7" id="aCloseTb${blogId}" onclick="${objName}.closeCssTabBarAll(\'${blogId}\');${objName}.closeTrackbacks(\'${blogId}\');return false;">&nbsp;</span></div>\
		<div class="g_c_pdin">\
			<div class="c08">�������õ�ַ:&nbsp;&nbsp;<span id="copyFinished_${blogId}" style="display:none" class="n_ f17">�����������ӳɹ�</span></div>\
			<div>\
				<a id="tb_${blogId}" class="c06"><span>http://${hostName|parentDomain}/${tbUrl}</span></a>&nbsp;\
				<a id="imgCopyPerma${blogId}" class="g_c_button bd01 butn c05" title="������������" onclick="clickTBUrl(\'tb_${blogId}\', \'copyFinished_${blogId}\')" >������</a>&nbsp;\
				<a id="imgRefer${blogId}"  class="g_c_button bd01 butn c05" title="������ƪ��־" {if visitorName!=null && visitorName != ""}onclick="window.open(\'http://${visitorName|parentDomain}/blog/getBlog.do?bid=${blogId}&r=1&host=${visitorName}&uid=${hostId}\');"{else}onclick="showLoginDlg(\'\');return false;" {/if}>������</a>\
			</div>\
		</div>\
		{if tbs != null && tbs.length != 0}\
			<div class="g_menu_06 c09">\
			<p class="g_h_20 g_t_left c08">���ü�¼:</p>\
			{for tb in tbs}\
			  <div>\
				<p class="g_t_hide g_h_18 c05"><em>&#149;</em><a class="c05" href="${tb.referBlogUrl}" target="_blank">${tb.referBlogTitle|default:""|escape}</a>\
				(<label class="c09">������:&nbsp;</label>&nbsp;<a class="c06" href="${tb.referHomePage|default:""|escape}" target="_blank">${tb.referBloggerName|default:""|escape}</a>)</p>\
			  </div>\
			{/for}\
			</ul>\
		{/if}\
');

var jst_blog_prev_related_circle = new String('\
    {if relateCircles.length != 0}\
    <div style="margin:50px 0px;">\
	    <div class="blogCircleHint c08">���Ȧ���Ƽ�</div><div class="blogCircleDash bd1c"></div><div style="clear: both;"></div>\
	    <table class="relateCircleBody">\
	    	{for circleBlogs in relateCircles}\
	    		{if circleBlogs.length>=1}\
	    		<tr style="vertical-align:middle">\
		    		<td style="width:5px;height:20px;margin:0px;padding:0px" class="c06">&#149;</td>\
		    		<td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyLeft"><a class="c06" href="${circleBaseUrl}/${circleBlogs[0].circle.urlName}" target="_blank">${circleBlogs[0].circle.name|escape}</a></td>\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight"><a class="c05" href="${CircleInfo.getCircleBlogLink(circleBlogs[0].circle.urlName, circleBlogs[0].blogUserName, circleBlogs[0].permalink)}" target="_blank">${circleBlogs[0].blogTitle|escape}</a></td>\
				    {if circleBlogs.length>=2}\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight"><a class="c05" href="${CircleInfo.getCircleBlogLink(circleBlogs[1].circle.urlName, circleBlogs[1].blogUserName, circleBlogs[1].permalink)}" target="_blank">${circleBlogs[1].blogTitle|escape}</a></td>\
				    {else}\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight">&nbsp;<td>\
				    {/if}\
			    </tr>\
	    		{/if}\
	    	{/for}\
	    </table>\
    </div>\
    {/if}\
');
//�����߱��붨��g_userTagListȫ���û���ǩ�����飬����ssesion��ȡuserTagList����ֵ
//���tagʱ�ŵ��롣Ԫ��ΪTag���󡣱�֤tagΨһ��ȫ������
//var g_userTagList = new Array();
//var userTagLoaded = false;

var recomTagArr = ["��Ů", "Web2.0", "����", "����","LOVA", "����", "Java", "����",    
"ӳ��", "mood", "����", "����","�Ϻ�", "���ְ���", "Diary", "����", "����", "LOMO", "��̸", "���", "����", "photo" ,  
"����", "���", "feeling", "����", "�羰", "LOVE", "����", "��ý", "��չ", "���", "���", "����", "��������" ,  
"Life", "����", "IT", "��Ӱ", "��ʳ" , "����", "Linux", "����", "����", "����", "Movie", "����", "�Ƽ�", "Music", "����",  
"���籭", "���߰���", "�ҵ�", "����", "����", "��������", "ѧϰ", "С˵", "����","����", "����", "�ղ�", "����", "��ժ",   
"����", "�ռ�", "����", "��ˮ��" , "Ϳѻ", "��Ϣ��", "����", "����", "��Ӱ","������Ѷ", "����", "��Ůд��", "����", "ʫ��",   
"����", "����", "����","ת��", "ͼƬ", "�Ķ�"];

// ��Ƭ���Ƽ���ǩ 14 + 17 + 17 + 8 = 56
var recomPhotoTags = ["��","��Ů","˧��","����","����","����","ͬѧ","����","����","�Ϲ�","����","����","�ֵ�","ͷ��",
"����","��Ц","����","����","�ɰ�","����","��","ʱ��","����","����","��ɴ","����","��ͼ","�ز�","����","ģ��","����",
"��Ů","��Ӱ","����","����","����","��ʳ","���","����","����","����","����","����","ѧУ","����","����","��Ӱ","д��",
"�滭","����","�羰","����","ֲ��","ŷ��","����"];

// �Ƽ���ǩ�������
var recomTagTabNames = ["��  ��","��  ��","��  ��","��  ѧ","У  ԰","��  ��","��  ��","��  ��","��  ��","��  ý","��  ��"];

var recomTagArrs = [];
// ���ű�ǩ��ʹ��������ɫ��ʾ
var hotTags = ["����","��ʲ","�ж�","����","����","���չ�ϵ","̨������","��������","��Ů","�ܽ���","����Ƭ","���","�ݳ���","Ǳ����",
"���»�","����ΰ","����","����","�������","����","����","�԰�","ͬ��","����","���","��ӹ","�ŵ���ѧ","�ռ�","ħ��","У��","�ۻ�","����С˵","ԭ����Ʒ","����","����Ա","��ѧ","����","NBA","����","���","�٤",
"�й�����","¥��","�Լ���","�羰","�μ�","¿��","����","��Ʊ","��ͥ���","ְ��","���","Ͷ�ʻ���","����","�����","����","DIY","WEB2.0",
"�ʼǱ�","����","������","������ȫ","�ҹ���","����Ա","Ҧ��","����","�ؼ�","����","����","��ʳ","����Ȼ","��Ʊ�Ƽ�","������","���","������","����"];

recomTagArrs[0] = ["ʱ��","�ȵ�","ҽ��","����","�籣","����","������̸","��ҵ","ҽ��","��У","�̸�","�վ�","��ʲ",
"���ʹ�ϵ","����","����","�ж�","����","����","APEC","��������","������","������","WTO","���̲�","��������","��������",
"��ѧ����","���չ�ϵ","ʳƷ��ȫ","̨������","ϣ������"];

recomTagArrs[1] = ["Ӱ��","����","��������","������","����ı","������","�����","��Ů",
"�ν�","���","���","�ܽ���","������","����Ƭ","�佱","K��","����","����","�ٳ�","��Ϯ","�ݳ���",
"��Ƭ","ר��","CD","����ɭ","���μ�","����","���ִ��","TVB","Խ��","twins","��Ӱ","���Ӿ�","����",
"�վ�","����","����","���¸�","��Ѹ","�¿���","���̨","����Ƭ","����","Ǳ����","����","���","��Ա",
"ԭ��","������","����","���»�","���ս�Ŀ","��Ц","�쾲��","������","����","����ΰ","�϶��ܿ�"];

recomTagArrs[2] = ["��","����","�Ϲ�","�ְ�","����","����","����","����","����","����","����","���","����","��",
"��","Ů��","����","�԰�","��ɫ","�ж�","���","����","����","˼��","��","���","�ֲ�","����","����","��Ĭ","����",
"ʧ��","ͬ����","����","����","LOVE","�Ұ���","����","˽���ռ�","����","�Ը�","��Ů","˧��","�Բ���","����","ͬ��","����",
"����","��ϧ","����","���","Ը��","����"];

recomTagArrs[3] = ["��","У԰","����","���μ�","����","������","��ѧ","ľ����","���ݱ���","������","��¥��","��ӹ","������",
"��������","�����","��","����","����","�о�����","����","ѧ��","����","�Ļ�","��ѧ","���","�ռ�","����","ͯ��","С˵","�ŵ���ѧ","��ѧ�о�","��ѧ����","��ѧ����",
"�ŵ�ʫ��","�ִ�ʫ��","����С˵","����С˵","����С˵","����С˵","����С˵","ԭ����Ʒ","80��"];

recomTagArrs[4] = ["����","�߿�","��ְ","����","��ѧ","��ʦ","����","����","�ļ�",
"����","��У","У԰","ѧ��","�Կ�","��˼","����","����","����","����","���Լ���","ħ��","��Ů","У��","��ϰ","���","ʵϰ",
"ͼ���","ʦ��","ʦ��","�ۻ�","����","��ר","����","��ѵ","����","����","��ҵ","�̲�","�ҹ���","�¶���","�Ŀ���","�̸�",
"ʮ��","�������","��ʿ","����Ա","��ѧ��","��ѧ��","�о���"];

recomTagArrs[5] = ["NBA","����","����","���","Ҧ��","����","���籭","�й�����","³��","����","Ů��","ŷ�ޱ�","���","������",
"Ӣ��","���˺�ķ","Ӣ����","���ɶ���","����","����","����","��������","�ж���","�ƽ���","��Ӿ","������","����","����","�ѵ���",
"�ﾶ","����","������","����","�٤","��������","ת��","ת��","����","����","�Ǿ�","�ھ�","ʤ��","ʧ��","�ۺ�����","����"];

recomTagArrs[6] = ["����","ѧϰ","������","����","��Ϸ","����","���","����","����","����","������","�ֻ�","����","����",
"����","���","����","����","�ؼ�","��ҽ","ʳ��","����","����ѧ","�ز�","��ɫ��","����","��˾","����","׬Ǯ","����","����",
"����","����","��","ѧ��","����","����","����","��ģ","�Ҿ�","����","����","����","����","¥��",
"��","�ⷿ","�Ҿ�","װ��","�Լ���","���ز�"];

recomTagArrs[7] = ["����","��Ӱ","�羰","��ʤ","����","�ż�","������Ƭ","�μ�","���","¿��","����","��ͼ","����",
"����","���","����Ȼ","����","˯��","������","����","��ɽЬ","�ų�","��Ѷ","��Ӱ","������","��Ȼ","���","��·","����",
"����","����","װ��","ָ��","���","����","����","��Ȥ","¶Ӫ","��ɽ","��ʳ","����","����","Э��","��Խ","����","����","����",
"����","ѩɽ","��ԭ","����","����","ɭ��","��","��ԭ","ī��","̽��","���г�","ԽҰ","��ɽ","ԭʼ","ɽҰ","����","�󱳰�","�ŵ�"];

recomTagArrs[8] = ["��ҵ","����","����","�ղ�","�ƾ�","����","����","����","����","��Ӫ","ó��","Ʒ��","�ڻ�","��Ʊ","����","֤ȯ","����",
"����","��ҵ","����","����","Ӫ��","ְ��","�ʱ�","���","���","Ͷ��","����","����","����","����","�ɸ�","����","�¹�","���շ�","��ҵ��","�����","���ÿ�","��ǩ��","��С��","�زֹ�",
"���","��֧","Ͷ��","�̵�","����","��γ�","�ɶ�","���","��ծ","����","��ָ�ڻ�","��ͥ���","�����ռ�","���Ʒ���","��Ʊ�Ƽ�","Ͷ������","˽ļ����","Ͷ�ʻ���","��ҵ���"];

recomTagArrs[9] = ["��ý","ý��","����","��ҵ","�ɷ�","�༭","����","��־","��ֽ","ֽý��","TV","�ƾ�ý��",
"��ͳý��","����̨","��ý��","����ý��","��ý�۲�","������","CCTV","Ц��","����˹","��ģ","����","ƽ̨","Ƶ��","���","����","������",
"���","��������","��̨"];

recomTagArrs[10] = ["����","WEB2.0","����","������","����","����","ά��","IT��̬","IT����","IT����","��Ƶ","���",
"Vista","����","���","����","�û�����","�ڿ�","����","��ȫ","Ӳ��","DIY","����",
"�ʼǱ�","��������","ͨ��","3G","3C�ں�","IPTV","VoIP","�ֻ�����","��ֵ����","֪ʶ��Ȩ","�������","����","���õ���",
"�ֻ�","����","����","����","���","ְ��","������","����","����","����","����","̽��","������ѧ","����","��������","������"];

var blogTagLayer = null;

var PP_PREFIX = 'p^';
var EX_PREFIX = 'e^';

//���û�����tag������
function findUserTagList(tag){
	var tagObj = getTagObjByTagname(tag, -1, g_userTagList);
	if(tagObj)
		return true;
	else
		return false;
}

//����tag���Զ����tag���û�tag�⣬�����û�tag��ȥ��
//tagInfoTemp�����������, tagInfoTemp.tags��ǰtagInfoTemp.numJoin��Ϊ��Ҫ��ӵ��û����tag
//ʹ�÷��������ô˺�����ô�����tag��Ȼ��
//Ȼ�����session�е�userTagListָ����ͬҳ���û�tag��һ��(��EditPhotoUploadAction)
function procTagsUtil(tagInfoTemp){
	
	//�Ѷ��ŷָ���tag�ַ���ȥ�أ��滻Ӣ�Ķ��ź�ȥ��β�ո�
	var	tags = processTagString(tagInfoTemp.tags);
	
	//����ǰ��tag����
	var tagOldList = tags.split(",");

	//����ȥ��
	tagOldList = removeSameEl(tagOldList);	
	
	//������tag����
	var tagNewList = new Array();
	//��Ҫ�Զ���ӵ��û�tag�������
	var tagJoinList = new Array(); 
	var tagNotJoinList = new Array();
	var data;
	for(data=0; data<tagOldList.length; data++){
		var tod = tagOldList[data];
		if(tod!=""){
			if(findUserTagList(tod) || tod.indexOf(PP_PREFIX) == 0 || tod.indexOf(EX_PREFIX) == 0){
				tagNotJoinList.push(tod);
			}else{
				tagJoinList.push(tod);
			}
		}
	}
	
	tagNewList = tagJoinList.concat(tagNotJoinList);
	//����ȥ��
	tagNewList = removeSameEl(tagNewList);
	
	//��������
	tagInfoTemp.numJoin = tagJoinList.length;
	tagInfoTemp.tags = tagNewList.toString().toLowerCase(); 
}

//ע�⣺����˳��ΪprocessTagString,processTagUtilForCb,procTagsUtil,structQuotedTag
//�ͷ�����һ���Ĵ��������˷���ֻ��������ص����tag�������Ĵ����ɷ���������ɡ�����ո�˫���ţ�ȥ��ÿ��tag��β�ո�
function processTagUtilForCb(tags) {	
	var strTagQuotList = new Array();
	var resultTags ="";
		
	//��������
	var posQuot1 = -1;
	var posQuot2 = -1;
	do{
		posQuot1 = tags.indexOf('\"', 0);
		if(posQuot1 != -1)
			posQuot2 = tags.indexOf('\"', posQuot1+1);
		if(-1!=posQuot1 && posQuot2>posQuot1){
			var strQuot = tags.substring(posQuot1+1, posQuot2);
			//������
			strQuot = strQuot.replace(/,/g, " ");			
			//ȥ����β�ո�
			strQuot = Trim(strQuot);
			//ȥ�������ո�	
			strQuot = strQuot.replace(/\s+/g, " ");		
			strTagQuotList.push(strQuot);
			tags = tags.substring(0, posQuot1) + "," + tags.substring(posQuot2+1);
		}
	}while(-1!=posQuot1 && -1!=posQuot2);
	
	//��������Ų���ʾ
	tags = tags.replace(/"/g, "");
	
	//�����ź�(�롢ȫ��)�ո�
	tags = tags.replace(/ /g, ",").replace(/��/g,",");
	var strTagArr = tags.split(",");
	
	// ȥ���ո�tag����ȥ��ÿ��tag��β�ո�
	strTagQuotList.each(function(str){
		if(str != ""){
			str = Trim(str);
			if(resultTags != ""){
				resultTags += ",";
			}
			resultTags += str;
		}
	});		
	
	strTagArr.each(function(str){
		if(str != ""){
			str = Trim(str);
			if(resultTags != ""){
				resultTags += ",";
			}
			resultTags += str;
		}
	});		
	
	//����ȥ��
	return removeSameEl(resultTags.split(",")).toString();	
}

//�����Զ��Ÿ�����tag���������tag���пո����tagǰ�������
function structQuotedTag(tagArr){
	var tag = "";
	tagArr.each(function(str){
		if(str.indexOf(' ', 1)>0){
			str = "\"" + str + "\"";
		}
		if(tag!="")
			tag += ",";
		tag += str;
	});			
	return tag;
}

//������tag��list��������tag��string��������ʽѡһ����һ��null
function tagEscape(tagList, tagStr){
	if(tagStr != null){
		tagList = tagStr.split(",");
	}
	var i;
	for(i=0; i<tagList.length; i++){
		tagList[i] = tagList[i].toString();
	}
	
	if(tagStr != null){
		return tagList.toString();
	}else{
		return tagList;
	}
}

//�Ƚ������ԡ�,��������tag�ַ������ó�newTags����Ҫ�����ĺ���Ҫɾ����tag�ַ���
//oldTagsԭtag�ַ���,newTags���º��tag�ַ���
//tagInfoTemp�����������, tagInfoTemp.addTags��Ҫ������tag�ַ���,tagInfoTemp.delTags��Ҫɾ����tag�ַ���
function getAddDelTags(tagInfoTemp, oldTags, newTags){
	var tagOldList = new Array();
	var tagNewList = new Array();
	if(oldTags)
		tagOldList = oldTags.split(",");
	if(newTags)
		tagNewList = newTags.split(",");
	
	var tagAddList = new Array(); 
	var tagDelList = new Array();
	var i;
	var j;
	//�õ���Ҫ����tag
	for(i=0; i<tagNewList.length; i++){
		for(j=0; j<tagOldList.length; j++){
			if(tagNewList[i] == tagOldList[j]){
				break;
			}
		}
		if(j==tagOldList.length){
			tagAddList.push(tagNewList[i]);
		}
	}		
	//�õ���Ҫɾ��tag
	for(i=0; i<tagOldList.length; i++){
		for(j=0; j<tagNewList.length; j++){
			if(tagOldList[i] == tagNewList[j]){
				break;
			}
		}
		if(j==tagNewList.length){
			tagDelList.push(tagOldList[i]);
		}
	}
	
	tagInfoTemp.addTags = tagAddList.toString();
	tagInfoTemp.delTags = tagDelList.toString();
}

/*-----------------------------------------------------------------------------------------------------------------------
   ���ı�ǩ -- BEGIN
  -----------------------------------------------------------------------------------------------------------------------*/

// ��Щ�����Ժ���ļ���ȡ


/**
 * ��ȡpp��ǩҳ���html����
 * @param	{String}	inputId
 * 			element id
 * @return	{String}
 * 			html����
 */
 
// �Ƽ���ǩ��
var recomTagCount = 0;
// ���ǩ��
var actTagCount = 0;

var oldPPTag = '';

var idPrefix1 = "city_";
var idPrefix2 = "other_";

function getPPTagTabHTML(inputId){
	var str = "";
	str+="<span style='color:#aaa;margin-left:0px;'>���ѡ���Ӧ�ı�ǩ����ѡ</span><br />";

	var comCss = "display:inline;margin:0px;padding:2px 5px 0px 5px;border-top:#aaa 1px solid;border-right:#aaa 1px solid;";
	
	str += "<div style='margin-top:3px;padding:0px;overflow:visible;z-index:20;'>";
	str += "	<div id='tagTab1_"+inputId+"'  style='"+comCss+" border-left:#aaa 1px solid;'><span id='tabTitle1' style='color:#aaaaaa;cursor:pointer;' onclick='return tagTabclick(1,\""+inputId+"\",1);'>�Ƽ���ǩ</span></div>";
	str += "	<div id='tagTab2_"+inputId+"' style='"+comCss+"margin-left:-4px!important;margin-left:0px;'><span id='tabTitle2' style='color:#aaaaaa;cursor:pointer;' onclick='return tagTabclick(2,\""+inputId+"\",1);'>���ǩ</span></div>";
	str += "	<div id='tagTabShowTags_"+inputId+"' style='padding:5px;background-color:#ffffe1;border:#aaa 1px solid;'></div>";
	str += "</div>";
	
	return str;
}

function get1StepPPRecomTagsHTML(inputId){
	var a = [];
	
	var comCss = "float:right;color:#aaa;";
	a.push("<div style='"+comCss+"'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\",\"" + 'ppTag' + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
	a.push("<div style='margin-left:4px;color:#aaa;'>��һ������ѡ��һ��һ����ǩ</div>");
	a.push("<div style='clear:both;'></div>");
	
	// city tags
	a.push("<div style='padding:6px; margin-top:6px; border-top:1px solid #aaa;'>");
	var i = 0;
	var idName;
	aFirstCityTags.each(function(e){
		idName = idPrefix1 + i;
		a.push("<div id=" + idName + " style='display:inline;margin-right:6px;line-height:22px;'><a href='#' style='color:#333333;' onclick='set1StepPPElementValue(\""+ inputId + "\", 0, this); return false;' onmouseover='changeBgImage(this);' onmouseout='resetBgImage(this);'>"+ e +"</a></div>");
		i++;
	});
	a.push("</div>");
	
	// other tags
//	i = 0;
	a.push("<div style='padding:6px; border-top:1px solid #aaa;'>");
	aFirstOtherTags.each(function(e){
		idName = idPrefix2 + i;
		a.push("<div id=" + idName + " style='display:inline;margin-right:6px;line-height:22px;'><a href='#' style='color:#333333;' onclick='set1StepPPElementValue(\""+ inputId + "\", 0, this); return false;' onmouseover='changeBgImage(this);' onmouseout='resetBgImage(this);'>"+ e +"</a></div>");
		i++;
	});
	a.push("</div>");
	return a.join("");
}

function  set1StepPPElementValue(inputId, tagIndex, el){
	var div = el.parentNode;
	var sId = div.id;
	if(tagIndex == 0){
		if(sId.indexOf(idPrefix1) == 0){
			// because 5 = 'city_'.length
			sId = sId.substr(5);
			$('tagTabShowTags_'+inputId).innerHTML = get2StepPPRecomTagsHTML(inputId, sId, false);
		}
		else if(sId.indexOf(idPrefix2) == 0){
			// because 6 = 'other_'.length
			sId = sId.substr(6);
			$('tagTabShowTags_'+inputId).innerHTML = get2StepPPRecomTagsHTML(inputId, sId, true);
		}
	}
	else if(tagIndex == 1){
		// because 4 = 'act_'.length
		sId = sId.substr(4);

		$('tagTabShowTags_'+inputId).innerHTML = get2StepPPActiveTagsHTML(inputId,sId);
	}
}

function get2StepPPRecomTagsHTML(inputId, index, isOther){
	var a = [];
	var oldIndex = index;
	
	var comCss = "float:right;color:#aaa;";
	a.push("<div style='"+comCss+"'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\",\"" + 'ppTag' + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
	a.push("<div style='margin-left:4px;color:#aaa;'>�ڶ�������ѡ��1��3��������ǩ</div>");
	a.push("<div style='clear:both;'></div>");
	
	var aFirstTags = aFirstCityTags;
	var aSecondTags1 = aSecondCityTags1;
	var aSecondTags2 = aSecondCityTags2;
	var aSecondTags3 = aSecondCityTags3;
	var secPrefix = idPrefix1;
	if(isOther){
		aFirstTags = aFirstOtherTags;
		aSecondTags1 = aSecondOtherTags1;
		aSecondTags2 = aSecondOtherTags2;
		aSecondTags3 = aSecondOtherTags3;
		
		secPrefix = idPrefix2;
		
		index = index - aFirstCityTags.length;
	}
	
	a.push("<div style='padding:6px 6px 0px 6px; margin-top:6px; border-top:1px solid #aaa;'>");
	a.push("<div style='font-weight:bold;color:#333;'>" + aFirstTags[index] + "</div>");
	
	a.push("<div style='padding:0px 6px 6px 6px; margin-top:6px; margin-left:20px; border-bottom:1px solid #aaa;'>");
	var i = 0;
	// ��һ��
	var aTag1 = aSecondTags1[index];
	aTag1.each(function(e){
		idName = secPrefix + i;
		a.push("<div id=" + idName + " style='display:inline;margin-right:6px;line-height:22px;'><a href='#' style='color:#333333;' onclick='set2StepPPElementValue(\""+ inputId + "\", \""+ oldIndex + "\", 0, this); return false;'>"+ e +"</a></div>");
		i++;
	});
	// TODO, ����Զ���input�����󳤶�
	a.push("<div><label>�Զ��壺</label><input id='selfDefinedTag' name='selfDefinedTag' size=22 onkeyup='checkUserInput();' /></div>");
	a.push("</div>");
	
	// �ڶ���
	var aTag2 = aSecondTags2[index];
	a.push("<div style='padding:0px 6px 6px 6px; margin-top:6px; margin-left:20px; border-bottom:1px solid #aaa;'>");
	aTag2.each(function(e){
		idName = secPrefix + i;
		a.push("<div id=" + idName + " style='display:inline;margin-right:6px;line-height:22px;'><a href='#' style='color:#333333;' onclick='set2StepPPElementValue(\""+ inputId + "\", \""+ oldIndex + "\", 0, this); return false;'>"+ e +"</a></div>");
		i++;
	});
	a.push("</div>");
	
	// ������
	var aTag3 = aSecondTags3[index];
	a.push("<div style='padding:0px 6px 6px 6px; margin-top:6px; margin-left:20px; '>");
	aTag3.each(function(e){
		idName = secPrefix + i;
		a.push("<div id=" + idName + " style='margin-bottom:4px;'><a href='#' style='color:#333333;' onclick='set2StepPPElementValue(\""+ inputId + "\", \""+ oldIndex + "\", 0, this); return false;'>"+ e +"</a></div>");
	});
	a.push("</div>");
	
	a.push("<div style='padding:0px 6px;margin:0px 0px 4px 20px;'><center><input type='button' style='width:60px;' value='����' onclick='goBack(\""+ inputId + "\",\""+ oldIndex + "\", 0);' />&nbsp;&nbsp;&nbsp;&nbsp;<input id='selfDefineBtn' type='button' disabled='true' style='width:60px;' value='�Զ���' onclick='goOk(\""+ inputId + "\", \""+ oldIndex + "\", 0);' /></center></div>");
	
	a.push("</div>");
	return a.join("");
}

function checkUserInput() {
	var	shouldDisable=false;
	
	if ($('selfDefinedTag').value=='')
		shouldDisable=true;
		
	$('selfDefineBtn').disabled=shouldDisable;
}

function set2StepPPElementValue(inputId, index, tagIndex, el){
	var aFirstTags = aFirstCityTags;
	var tmpIndex = index;
	if(index >= aFirstCityTags.length){	// other tags
		aFirstTags = aFirstOtherTags;
		tmpIndex = index - aFirstCityTags.length;
	}
	
	var selectVal;
	if(isIE){
		selectVal = el.innerText;
	}else{
		selectVal = el.text;
	}
	
	if(tagIndex == 0){	// �Ƽ���ǩ
		var oldIndex = $('hidden_recom').value;

		if(oldIndex==index){
			if(recomTagCount >= 3){
				alert("�Ƽ���ǩ�����ܳ���3����");
				return;
			}
			else{
				var sHead = aFirstTags[tmpIndex] + '-'; 
				if(isTheSameTag(inputId, sHead, selectVal)){
					el.onclick = null;
					el.style.cursor = "default";
					el.style.color = "#666";
					return;
				}
			}
		}
		
		var sOldHead;
		if(oldIndex >= aFirstCityTags.length)
			sOldHead = aFirstOtherTags[oldIndex - aFirstCityTags.length] + '-';
		else
			sOldHead = aFirstCityTags[oldIndex] + '-';
			
		var sNewHead = aFirstTags[tmpIndex] + '-';
		recomTagCount = deal2StepClick(inputId, 'hidden_recom', recomTagCount, index, sOldHead, sNewHead, el);
	}
	else if(tagIndex == 1){
		var oldIndex = $('hidden_act').value;

		if(oldIndex==index){
			if(actTagCount >= 3){
				alert("���ǩ�����ܳ���3����");
				return;
			}
			else{
				var sHead = aFirstActiveTags[index] + '-'; 
				if(isTheSameTag(inputId, sHead, selectVal)){	// �ж��ظ����
					el.onclick = null;
					el.style.cursor = "default";
					el.style.color = "#666";
					return;
				}
			}
		}
		
		var sOldHead = aFirstActiveTags[oldIndex] + '-';
		var sNewHead = aFirstActiveTags[index] + '-';
		actTagCount = deal2StepClick(inputId, 'hidden_act', actTagCount, index, sOldHead, sNewHead, el);
	}
}

/*
 * @parma	{String}	inputId
 * @param	{Number}	tagIndex
 *			0 -- �Ƽ���ǩ��1 -- ���ǩ
 */
function goBack(inputId, index, tagIndex){
	var sHead;
	if(tagIndex == 0){
		var aFirstTags = aFirstCityTags;
		if(index >= aFirstCityTags.length){	// other tags
			aFirstTags = aFirstOtherTags;
			index = index - aFirstCityTags.length;
		}
		
		$('tagTabShowTags_'+inputId).innerHTML = get1StepPPRecomTagsHTML(inputId);
		recomTagCount = 0;
		sHead = aFirstTags[index] + '-';
	}
	else if(tagIndex == 1){
		$('tagTabShowTags_'+inputId).innerHTML = get1StepPPActiveTagsHTML(inputId);
		actTagCount = 0;
		sHead = aFirstActiveTags[index] + '-';
	}
	
	var str = $(inputId).value;
	if(str){
		$(inputId).value = removePart(str, sHead);
	}
}

// ȷ��
function goOk(inputId, index, tagIndex){
	var selfTag = $('selfDefinedTag').value;
	if(tagIndex == 0){	// �Ƽ���ǩҳ
		// �Զ������ֻ������һ����ǩ��
		// TODO �������붺�ŵ����
		if(selfTag != ''){
			var aFirstTags = aFirstCityTags;
			var tmpIndex = index;
			if(index >= aFirstCityTags.length){	// other tags
				aFirstTags = aFirstOtherTags;
				tmpIndex = index - aFirstCityTags.length;
			}
	
			var oldIndex = $('hidden_recom').value;
			var sOldHead;
			if(oldIndex >= aFirstCityTags.length)
				sOldHead = aFirstOtherTags[oldIndex - aFirstCityTags.length] + '-';
			else
				sOldHead = aFirstCityTags[oldIndex] + '-';
			var sNewHead = aFirstTags[tmpIndex] + '-';
			recomTagCount = deal2StepOk(inputId, 'hidden_recom', recomTagCount, index, sOldHead, sNewHead, selfTag);
		}
		else if(recomTagCount == 0){
			alert("��ѡ�������ǩ���Զ������Ķ�����ǩ��\n\n��Ҳ���Ե�����أ�����ѡ��һ����ǩ��");
			return;
		}
	}
	else if(tagIndex == 1){	// ���ǩҳ
		// �Զ������ֻ������һ����ǩ��
		// TODO �������붺�ŵ����
		if(selfTag != ''){
			var oldIndex = $('hidden_act').value;
			var sOldHead = aFirstActiveTags[oldIndex] + '-';
			var sNewHead = aFirstActiveTags[index] + '-';
			actTagCount = deal2StepOk(inputId, 'hidden_act', actTagCount, index, sOldHead, sNewHead, selfTag);
		}
		else if(actTagCount == 0){
			alert("��ѡ�������ǩ���Զ������Ķ�����ǩ��\n\n��Ҳ���Ե�����أ�����ѡ��һ����ǩ��");
			return;
		}
	}
}

function deal2StepOk(inputId, hiddenId, count, index, sOldHead, sNewHead, selfTag){
	var oDocOb = $(inputId);
	var oldIndex = $(hiddenId).value;
			
	if(oldIndex == -1 || oldIndex == index){
		if(count == 3){
			alert("�������Ѿ�ѡ����3��������ǩ�������ټ���������ı�ǩ��\n\n���ȷ��أ�����ѡ��");
			return;
		}
			
		if(oldIndex == index && isTheSameTag(inputId, sNewHead, selfTag)){	// �ж��ظ����
			hideUserAllTags(inputId,'ppTag');
			return count;
		}
		
		$(hiddenId).value = index;
		// ����ǩ��δ����3�������û��Զ����ǩ����
				
		if(oDocOb.value.indexOf('-',1) == -1){
			oDocOb.value = sNewHead + selfTag;
		}
		else{
			oDocOb.value = oDocOb.value + ',' + sNewHead + selfTag;
		}
				
		count++;
		hideUserAllTags(inputId,'ppTag');
	}
	else{	// һ����ǩ����ǰѡ��Ĳ�һ����ɾ��ԭ��һ����ǩ�йص�
		oDocOb.value = removePart(oDocOb.value, sOldHead);
				
		if(oDocOb.value == ''){
			oDocOb.value = sNewHead + selfTag;
		}
		else{
			oDocOb.value = oDocOb.value + ',' + sNewHead + selfTag;
		}
				
		$(hiddenId).value = index;
		count = 1;
		hideUserAllTags(inputId,'ppTag');
	}
	
	return count;
}

function get1StepPPActiveTagsHTML(inputId){
	var a = [];
	
	var comCss = "float:right;color:#aaa;";
	a.push("<div style='"+comCss+"'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\",\"" + 'ppTag' + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
	a.push("<div style='margin-left:4px;color:#aaa;'>��һ������ѡ��һ��һ����ǩ</div>");
	a.push("<div style='clear:both;'></div>");
	
	a.push("<div style='padding:6px; margin-top:6px; border-top:1px solid #aaa;'>");
	var i = 0;
	var idName;
	aFirstActiveTags.each(function(e){
		idName = 'act_' + i;
		a.push("<div id=" + idName + " style='margin-bottom:4px;'><a href='#' style='color:#333333;' onclick='set1StepPPElementValue(\""+ inputId + "\", 1, this); return false;' onmouseover='changeBgImage(this);' onmouseout='resetBgImage(this);'>"+ e +"</a></div>");
		i++;
	});
	a.push("</div>");
	
	return a.join("");
}

function get2StepPPActiveTagsHTML(inputId, index){
	var a = [];
	
	var comCss = "float:right;color:#aaa;";
	a.push("<div style='"+comCss+"'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\",\"" + 'ppTag' + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
	a.push("<div style='margin-left:4px;color:#aaa;'>�ڶ�������ѡ��1��3��������ǩ</div>");
	a.push("<div style='clear:both;'></div>");
	
	a.push("<div style='padding:6px 6px 0px 6px; margin-top:6px; border-top:1px solid #aaa;'>");
	a.push("<div style='font-weight:bold;color:#333;'>" + aFirstActiveTags[index] + "</div>");
	
	a.push("<div style='padding:0px 6px 6px 6px; margin:6px 0px;border-top:1px solid #aaa;'>");
	// ��һ��
	var aTag1 = aSecondActTags1[index];
	aTag1.each(function(e){
		idName = "act_" + i;
		a.push("<div id=" + idName + " style='display:inline;margin-right:6px;line-height:22px;'><a href='#' style='color:#333333;' onclick='set2StepPPElementValue(\""+ inputId + "\", \""+ index + "\", 1, this); return false;'>"+ e +"</a></div>");
		i++;
	});
	// TODO, ����Զ���input�����󳤶�
	a.push("<div><label>�Զ��壺</label><input id='selfDefinedTag' name='selfDefinedTag' size=32 /></div>");
	a.push("</div>");
	
	a.push("<div style='padding:0px 6px;margin:0px 0px 4px 20px;'><center><input type='button' style='width:60px;' value='����' onclick='goBack(\""+ inputId + "\",\""+ index + "\", 1);' />&nbsp;&nbsp;&nbsp;&nbsp;<input type='button' style='width:60px;' value='ȷ��' onclick='goOk(\""+ inputId + "\", \""+ index + "\", 1);' /></center></div>");
	
	a.push("</div>");
	
	return a.join("");
}

function isTheSameTag(inputId, sHead, selectVal){
	var snewTag = sHead + selectVal;
	var aTags = $(inputId).value.split(',');
	var ret = false;
	
	for(var i=0; i<aTags.length; i++){
		if(aTags[i] == snewTag){
			ret = true;
			break;
		}
	}
	
	return ret;
}

function deal2StepClick(inputId, hiddenId, count, index, sOldHead, sNewHead, el){
	var oDocOb = $(inputId);
	var selectVal;
	if(isIE){
		selectVal = el.innerText;
	}else{
		selectVal = el.text;
	}
	
	var oldIndex = $(hiddenId).value;
	if(oldIndex == -1 || oldIndex == index){
		$(hiddenId).value = index;
		count++;
	}	
	else{
		$(hiddenId).value = index;
		oDocOb.value = removePart(oDocOb.value, sOldHead);
		
		count = 1;
	}

	if(oDocOb.value == ''){
		oDocOb.value = sNewHead + selectVal;
	}
	else{
		oDocOb.value = oDocOb.value + ',' + sNewHead + selectVal;
	}
		
	el.onclick = null;
	el.style.cursor = "default";
	el.style.color = "#666";
	
	return count;
}

function removePart(strInput, sHead){
	var aTags = strInput.split(',');
	var a = [];
			
	aTags.each(function(e){
		if(e.indexOf(sHead) == -1){
			a.push(e);
		}
	});
			
	return a.join(',');
}

function changeBgImage(element){
	var div = element.parentNode;
	div.style.backgroundColor = "green";
}

function resetBgImage(element){
	var div = element.parentNode;
	div.style.backgroundColor = "";
}
/*-----------------------------------------------------------------------------------------------------------------------
   ���ı�ǩ -- END
  -----------------------------------------------------------------------------------------------------------------------*/
  
/**
 * ��ȡ��ǩҳ���html����
 * @param	{String}	inputId
 * 			element id
 * @return	{String}
 * 			html����
 */
function getTagTabHTML(inputId){
	var str = "";

	var comCss = "display:inline;margin:0px;padding:2px 5px 0px 5px;border-top:#aaa 1px solid;border-right:#aaa 1px solid;";
	
	str += "<div style='margin-top:3px;padding:0px;overflow:visible;z-index:20;'>";
	str += "	<div id='tagTab1_"+inputId+"'  style='"+comCss+" border-left:#aaa 1px solid;'><span style='color:#aaaaaa;cursor:pointer;' onclick='return tagTabclick(1,\""+inputId+"\",0);'>���б�ǩ</span></div>";
	str += "	<div id='tagTab2_"+inputId+"' style='"+comCss+"margin-left:-4px!important;margin-left:0px;'><span style='color:#aaaaaa;cursor:pointer;' onclick='return tagTabclick(2,\""+inputId+"\",0);'>�Ƽ���ǩ</span></div>";
	str += "	<div id='tagTabShowTags_"+inputId+"' style='padding:5px;background-color:#ffffff;border:#aaa 1px solid; table-layout:auto;'></div>";
	str += "</div>";
	return str;
}

// �ж��û���ǩ������
function isNoUserTags(){
	if(g_userTagList.length == 0)
		return true;
	else
		return false;
}

//�õ��û�tag
function getUserTagsHTML(inputId){
	var a = [];
	var comCss2 = "float:right;padding-bottom:3px; color:#aaa;";
	a.push("<div style='"+comCss2+"'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
	if(isNoUserTags()){
		a.push("<div style='text-align:center;color:#333333;margin-top:25px;'>��Ŀǰ��û�б�ǩ���������ǩ����Ƽ���ǩ��ѡ��</div>");
	}
	else{
		a.push('<div class="g_w_100 g_t_wrap" style="_height:1%;margin-top:25px;">');
		g_userTagList.each(function(e){
			if(e.tagName!=""){
				a.push("&nbsp;<a style='color:#333333;' href='#' style='margin-right:2px;' onclick='setElementValue(\""+ inputId + "\", this); return false;'>" + e.tagName + "</a>&nbsp;");
			}
		});
        a.push('</div>');	
	}
	
	a.push("<div style='margin-top:20px;text-align:right;color:#aaaaaa;'>�����ǩ���ö��Ż��߿ո����</div>");
	a.push("<div style='margin-top:6px;text-align:right;color:#aaaaaa;'>��ǩ���������������</div>");
		
	return a.join("");
}

//�õ��Ƽ�tag
function getRecomTagsHTML(inputId, index){
	if(inputId == "editBlogTag")	// ��־��ǩ
		return getBlogRecomTagsHTML(inputId,index);
	
	if(inputId.indexOf("photoTag") == 0 || inputId.indexOf("albumTag") == 0)	// ��Ƭ��ر�ǩ
		return getPhotoRecomTagsHTML(inputId);
		
	var a = [];
	a.push("<div style='float:right;padding-bottom:5px; color:#aaa;'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
		
	a.push("<div class='g_w_100 g_t_wrap' style='_height:1%;margin-top:25px;'>");
	recomTagArr.each(function(e){
		// �Ƽ���ǩ������Ϊ�գ���Ϊ���������趨��
		a.push("<a style='color:#333333;' href='#' style='padding:3px 0px;' onclick='setElementValue(\""+ inputId + "\", this); return false;'>" + e + "</a>&nbsp;&nbsp;");
	});
	a.push("</div>");
	
	a.push("<div style='margin-top:20px;text-align:right;color:#aaaaaa;'>�����ǩ���ö��Ż��߿ո����</div>");
	a.push("<div style='margin-top:6px;text-align:right;color:#aaaaaa;'>��ǩ���������������</div>");
		
	return a.join("");
}

function getPhotoRecomTagsHTML(inputId){
	var showUserTagsDiv = $("showUserTagsDiv_"+inputId);
	var width = showUserTagsDiv.style.width;
	var iWidth = parseInt(width);
	var a = [];
	var count = 0;
	var i = 0;
	
	var col_num = 7;
	
	if(iWidth <= 200)
		col_num = 5;
	
	var tagCss = "width:32px;padding:0px 4px 4px 4px;";	
	
	a.push("<div style='float:right;padding-bottom:5px; color:#aaa;'><a href='#' onclick='hideUserAllTags(\"" + inputId + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
	a.push("<div style='padding-bottom:25px;'></div>");
	
	a.push("<div><center><table style='text-align:left;table-layout:auto;'><tbody>");	// ��table���ڶ���
	for(; i<recomPhotoTags.length; i++){	
		if(count == 0){
			a.push("<tr>");
		}
		else if(count % col_num == 0){
			a.push("</tr><tr>");
		}
		
		a.push("<td style='"+tagCss+"'><a style='color:#333333;' href='#' onclick='setElementValue(\""+ inputId + "\", this); return false;'>" + recomPhotoTags[i] + "</a></td>");
		
		count++;
	}
	a.push("</tr></tbody></table></center></div>");
	
	a.push("<div style='margin-top:20px;text-align:right;color:#aaaaaa;'>�����ǩ���ö��Ż��߿ո����</div>");
	a.push("<div style='margin-top:6px;text-align:right;color:#aaaaaa;'>��ǩ���������������</div>");
	
	return a.join("");
}

/**
 * ��ȡ�Ƽ�tag�Ķ��tab��html
 * @param	{String}	inputId
 * 			element id
 * @param	{Number}	curTabIndex
 * 			tab����������
 * @return	{String}
 * 			���tab��html
 * TABS_LEN	��ʶtab�ĸ�������Ҫ��div����й�
 */
var TABS_LEN = 11;
function getBlogRecomTagsHTML(inputId, curTabIndex){
	// �����Ժ��Ƽ����ܶ�ʱ����չ
//	var isHead = 0;
//	var isEnd = 0;
//	
//	if(curTabIndex == 1)
//		isHead = 1;
//	
//	if((curTabIndex+TABS_LEN) > recomTagArrs.length)
//		isEnd = 1;
		
	var a = [];
	
	a.push("<div style='float:right;padding-bottom:5px; color:#aaa;'><a href='#' id='close_btn' onclick='hideUserAllTags(\"" + inputId + "\");return false;'><img src='http://st.blog.163.com/style/common/icn_closetag.gif' /></a></div>");
//	a.push("<div style='padding-bottom:25px;'></div>");
	a.push("<div style='margin-left:4px;padding-bottom:3px;margin-top:25px;'>");
	if(getIEVer() == 7)
		var comCss = "display:inline;padding:0px 6px;border-right:1px solid #aaaaaa;text-align:center;";
	else
		var comCss = "display:inline;padding:0px 7px 0px 8px;border-right:1px solid #aaaaaa;text-align:center;";
//	if(isHead == 1)
//		str +="	<div id='tagTabPrevRecom' style='"+comCss+"'>" + "<" + "</div>";
//	else
//		str +="	<div id='tagTabPrevRecom' style='"+comCss+"'><a id='aTagPrevRecom' href='#' onclick='recomTabDoPage(0,\""+curTabIndex+"\",\""+inputId+"\"); return false;'>" + "<" + "</a></div>";
	
	var i = curTabIndex;
	var count = 0;
	
	for(; i<=recomTagArrs.length; i++){	// i��1��ʼ������<=
		if(count == TABS_LEN)
			break;
	
		var tagId = "tagTabRecom" + i;
		if(i == recomTagArrs.length)
			a.push("<div id='"+tagId+"' style='"+comCss+" border-right:0px;'><span style='color:#333333;cursor:pointer;' onclick='return recomTagTabClick(\""+i+"\",\""+inputId+"\",\""+curTabIndex+"\");'>"+recomTagTabNames[i-1]+ "</span></div>");
		else
			a.push("<div id='"+tagId+"' style='"+comCss+"'><span style='color:#333333;cursor:pointer;' onclick='return recomTagTabClick(\""+i+"\",\""+inputId+"\",\""+curTabIndex+"\");'>"+recomTagTabNames[i-1]+ "</span></div>");
		count++;
	}
	
//	if(isEnd == 0)
//		str +="	<div id='tagTabNextRecom' style='"+comCss+"'><a id='aTagNextRecom' href='#' onclick='recomTabDoPage(1,\""+curTabIndex+"\",\""+inputId+"\"); return false;'>" + ">" + "</a></div>";
//	else
//		str +="	<div id='tagTabNextRecom' style='"+comCss+"'>" + ">" + "</div>";
//	
	a.push("</div>");

	a.push("<div id='tagTabShowRecomTags' style='padding:10px 4px 5px 4px;background-color:#ffffff;'></div>");

	return a.join("");
}

/**
 * �����Ƽ�tag��tab��ҳ
 * @param	{Number}	isPrev
 * 			0 -- ��һҳ��1 -- ��һҳ
 * @param	{String}	curTabIndex
 * 			��һ��tab������
 * @param	{String}	inputId
 * 			element id
 * @return	{Void}
 * 
 * @see		#getRecomTagsHTML
 * @see		#recomTagTabClick
 */
function recomTabDoPage(isPrev, curTabIndex, inputId){
	var index = parseInt(curTabIndex);

	if(isPrev == 0)
		index = parseInt(curTabIndex) - 1;
	else
		index = parseInt(curTabIndex) + 1;
	
	$('tagTabShowTags_'+inputId).innerHTML = getRecomTagsHTML(inputId,index);
	
	recomTagTabClick(index + "", inputId, index);
}

//ȫ�������¼�Ѿ���ʾ�û�����tag��div��id���� ��ÿ��showUserAllTags����ѯ���飬��֤ҳ����ֻ��ʾһ��div
var g_showUserAllTagsDiv = [];
//��ʾ�û�tag,type=1��ʾ��Ϣͬ����ʾ��type=2��ͬ����ʾ
function showUserAllTags(tagInputEl){
	// ʹinput���޸�
	tagInputEl.readOnly = false;
	var inputId = tagInputEl.id;
	var showTagId = "showUserTagsDiv_"+inputId;
	var showUserTagsDiv = $(showTagId);

	if(showUserTagsDiv.style.borderBottomStyle == "dotted"){
		return false;
	}
	
	if(showUserTagsDiv.style.display != "none" && showUserTagsDiv.innerHTML != "")	// ����Ѿ����ɹ�������û�����أ�ֱ����ʾ
		return false;
		
	//��ѯ���飬��֤ҳ����ֻ��ʾһ��div
	for(var i=0; i<g_showUserAllTagsDiv.length; i++){
		var eT = $(g_showUserAllTagsDiv[i]);
		if(eT){
			eT.innerHTML = "";
			eT.style.border = "none";
		}
	}
	g_showUserAllTagsDiv.push(showTagId);
	
	showUserTagsDiv.innerHTML = getTagTabHTML(inputId);
	showUserTagsDiv.style.display = "block";
	
	if(isNoUserTags()){
		tagTabclick(2, inputId, 0);
	}else{
		tagTabclick(1, inputId, 0);	
	}
	
	return false;	
}

var g_showPPTagsDiv = [];
function showPPTags(tagInputEl){
	// ��pp��ǩ��ʹinput�����޸�
	tagInputEl.readOnly = true;
	var inputId = tagInputEl.id;
	var showTagId = "showUserTagsDiv_"+inputId;
	var showUserTagsDiv = $(showTagId);

	if(showUserTagsDiv.style.display != "none" && showUserTagsDiv.innerHTML != "")	// ����Ѿ����ɹ�������û�����أ�ֱ����ʾ
		return false;
		
	//��ѯ���飬��֤ҳ����ֻ��ʾһ��div
	for(var i=0; i<g_showPPTagsDiv.length; i++){
		var eT = $(g_showPPTagsDiv[i]);
		if(eT){
			eT.innerHTML = "";
			eT.style.border = "none";
		}
	}
	g_showPPTagsDiv.push(showTagId);
	
	showUserTagsDiv.innerHTML = getPPTagTabHTML(inputId);
	showUserTagsDiv.style.display = "block";
	
	tagTabclick(1, inputId, 1);	
	
	return false;
}

function hideUserAllTags(inputId){
//	debugger;
	var showUserTagsDiv =$("showUserTagsDiv_"+inputId);
	showUserTagsDiv.style.display = "none";
	return false;	
}

/**
 * ��������ǩtab�¼�
 * @param	{Number}	type
 * 			1 -- �û�tag��2 -- �Ƽ�tag
 * @param	{String}	inputId
 * 			element id
 * @param   {Number}	index
 *			0 -- �����ı�ǩ��1 -- ���ı�ǩ
 * @return	{Boolean}
 * 			����������
 * @see		#getUserTagsHTML
 * @see		#getRecomTagsHTML
 */
function tagTabclick(type, inputId, index){
	var tab1Style = $('tagTab1_'+inputId).style;
	var tab2Style = $('tagTab2_'+inputId).style;
	
	var tab1ChildStyle = $('tagTab1_'+inputId).firstChild.style;
	var tab2ChildStyle = $('tagTab2_'+inputId).firstChild.style;
	if(type==1 && tab1ChildStyle.color != '#333333'){	// �Ѿ���ʾ��ǰtab����ôֱ�ӷ���
		$('tagTabShowTags_'+inputId).style.backgroundColor = "#ffffff";
		$('tagTabShowTags_'+inputId).innerHTML = getTab1HTML(inputId, index);
		//css�̶�������Ҫ��ȡ��css�ļ�
		tab1Style.backgroundColor = "#ffffff";
		tab1Style.borderBottom = "#ffffff 1px solid";
		tab1Style.marginBottom = "-1px";
		tab1Style.position="relative";

		tab1ChildStyle.color = "#333333";
		
		tab2Style.backgroundColor = "#eeeeee";
		tab2Style.borderBottom = "#aaa 1px solid";
		tab2ChildStyle.color = "#aaaaaa";
		
		$('tagTabShowTags_'+inputId).style.borderLeft = "#aaa 1px solid";
		
		// ����ǰtab�����óɲ��ɵ������ʽ������һ���óɿɵ��
		tab1ChildStyle.cursor = 'default';
		tab2ChildStyle.cursor = 'pointer';
	}
	else if(type==2 && tab2ChildStyle.color != '#333333'){
		$('tagTabShowTags_'+inputId).innerHTML = getTab2HTML(inputId, index);
		tab2ChildStyle.color = "#333333";
	
		if(inputId == "editBlogTag"){	// �������־��ǩ����������
			recomTagTabClick("1", inputId, 1);
		}

		tab2Style.backgroundColor = "#ffffff";
		tab2Style.borderBottom = "#ffffff 1px solid";
		tab2Style.marginBottom = "-1px";
		tab2Style.position="relative";
		
		tab1Style.backgroundColor = "#eeeeee";
		tab1Style.borderBottom = "#aaa 1px solid";
		tab1ChildStyle.color = "#aaaaaa";
		
		tab1ChildStyle.cursor = 'pointer';
		tab2ChildStyle.cursor = 'default';
	}
	
	return false;
}

/**
 * ��ȡ��һ��tab��html
 * @param	{String}	inputId
 * 			element id
 * @param   {Number}	index
 *			0 -- �����ı�ǩ��1 -- ���ı�ǩ
 * @return	{String}
 * 			html code
 * @see		#getUserTagsHTML
 * @see		#get1StepPPRecomTagsHTML
 */
function getTab1HTML(inputId, index){
	if(index == 0){
		return getUserTagsHTML(inputId);
	}
	else if(index == 1){
		return get1StepPPRecomTagsHTML(inputId);
	}
}

/**
 * ��ȡ�ڶ���tab��html
 * @param	{String}	inputId
 * 			element id
 * @param   {Number}	index
 *			0 -- �����ı�ǩ��1 -- ���ı�ǩ
 * @return	{String}
 * 			html code
 * @see		#getRecomTagsHTML
 * @see		#get1StepPPActiveTagsHTML
 */
function getTab2HTML(inputId, index){
	if(index == 0){
		return getRecomTagsHTML(inputId,1);
	}
	else if(index == 1){
		return get1StepPPActiveTagsHTML(inputId);
	}
}

/**
 * ��������Ƽ���ǩtag�¼�
 * @param	{String}	type
 * 			�Ƽ�tag����������
 * @param	{String}	inputId
 * 			element id
 * @param	{String}	curTabIndex
 * 			�Ƽ�tag��tab��������ʶ��ǰ�Ǵ��ĸ�tab��ʼ��ʾ�Ƽ�tag��
 * 			��ΪtabҲ����ǰ/��һҳ
 * @return	{Boolean}
 * 			����������
 * @see		#getSpecificRecomTagsHtml
 */
function recomTagTabClick(type, inputId, curTabIndex){
	$('tagTabShowRecomTags').innerHTML = getSpecificRecomTagsHtml(type,0,1,inputId);
	
	// �Ӵֱ������tag
	var count = 0;
	var index = parseInt(curTabIndex);
	var i;
	for(; count<TABS_LEN; count++) {
		i = index+count;
		$('tagTabRecom'+i).style.fontWeight = "normal";
		$('tagTabRecom'+i).firstChild.style.color = "#777777";
	}
	
	$('tagTabRecom'+type).style.fontWeight = "bold";
	$('tagTabRecom'+type).firstChild.style.color = "#333333";
	
	return false;
}

/**
 * ��ȡ�Ƽ�tag��tabҳ������
 * @param	{String}	type
 * 			�Ƽ�tag����������
 * @param	{Number}	startIndex
 * 			��������ʶtag�������鿪ʼ��ȡ֮��
 * @param	{Number}	iPage
 * 			��ǰҳ
 * @param	{String}	inputId
 * 			element id
 * @return	{String}
 * 			html��ʽ
 * @see		#getRecomTagArrByType
 */
 var LINE_NUM = 8;								// һҳ��ʾ������
 var ELE_NUM_PER_LINE = 7;						// ÿ����ʾ�ı�ǩ��
 var PAGE_NUM = LINE_NUM * ELE_NUM_PER_LINE;	// һҳ��ʾ�ı�ǩ��
function getSpecificRecomTagsHtml(type, startIndex, iPage, inputId){
	// ����"��ҳ 1/1 ��ҳ"��λ��
	var showUserTagsDiv = $("showUserTagsDiv_"+inputId);
	var width = showUserTagsDiv.style.width;
	var iWidth = parseInt(width);
	var mlOfPage = iWidth - 112;	// ml -- margin-left
	mlOfPage += "px";
	
	var recomTagArr = getRecomTagArrByType(type+"");
	var a = [];
	var count = 0;
	
	var tagCss = "width:65px;padding:0px 8px 8px 8px;";	
	
	a.push("<table style='table-layout:auto;'><tbody>");	// ��table���ڶ���
	for(; startIndex<PAGE_NUM*iPage; startIndex++){	// ��֤ÿҳ��ʾPAGE_NUM����ǩ
		if(count == 0){
			a.push("<tr>");
		}
		else if(count % ELE_NUM_PER_LINE == 0){
			a.push("</tr><tr>");
		}
		
		if(startIndex < recomTagArr.length){		// ����������ı�ǩ���ڣ���ʾ
			if(isHotTag(recomTagArr[startIndex]))	// ���ű�ǩ����������ɫ��ʾ
				a.push("<td style='"+tagCss+"'><a style='color:#ff7500;' href='#' onclick='setElementValue(\""+ inputId + "\", this); return false;'>" + recomTagArr[startIndex] + "</a></td>");
			else
				a.push("<td style='"+tagCss+"'><a style='color:#333333;' href='#' onclick='setElementValue(\""+ inputId + "\", this); return false;'>" + recomTagArr[startIndex] + "</a></td>");		
		}
		else										// �����ڣ�����
			a.push("<td style='"+tagCss+"'>&nbsp;&nbsp;</td>");

		if(count == (PAGE_NUM-1)){
			a.push("</tr>");
			break;
		}
		
		count++;
	}
	a.push("</tbody></table>");
	
	var comCss = "margin-left:"+mlOfPage+";padding-top:6px;color:#aaaaaa;";
	if(recomTagArr.length <= PAGE_NUM){
		a.push("<div style='"+comCss+"'>��ҳ&nbsp;&nbsp;<span style='font-weight:bold;'>1</span>/1&nbsp;&nbsp;��ҳ</div>");
	}
	else{
		var totalPage = Math.floor(recomTagArr.length / PAGE_NUM) + 1;
		var pageContent = "<span style='font-weight:bold;'>"+ iPage + "</span>/" + totalPage;
		// ������˵���һҳ���򽫡���һҳ����ɲ��ܵ��
		if(iPage == 1)
			a.push("<div style='"+comCss+"'>��ҳ&nbsp;&nbsp;" +pageContent+ "&nbsp;&nbsp;<a style='color:#333333;' id='aPrevPage' href='#' onclick='recomTagDoPage(1,\""+ type + "\",\""+ 1 + "\",\""+ inputId + "\"); return false;'>��ҳ</a></div>");
		else if(iPage == totalPage)
			a.push("<div style='"+comCss+"'><a style='color:#333333;' id='aPrevPage' href='#' onclick='recomTagDoPage(0,\""+ type + "\",\""+ iPage + "\",\""+ inputId + "\"); return false;'>��ҳ</a>&nbsp;&nbsp;" +pageContent+ "&nbsp;&nbsp;��ҳ</div>");
		else
			a.push("<div style='"+comCss+"'><a style='color:#333333;' id='aPrevPage' href='#' onclick='recomTagDoPage(0,\""+ type + "\",\""+ iPage + "\",\""+ inputId + "\"); return false;'>��ҳ</a>&nbsp;&nbsp;" +pageContent+ "&nbsp;&nbsp;<a style='color:#333333;' id='aPrevPage' href='#' onclick='recomTagDoPage(1,\""+ type + "\",\""+ iPage + "\",\""+ inputId + "\"); return false;'>��ҳ</a></div>");
	}
	
	a.push("<div style='margin-top:20px;text-align:right;color:#aaaaaa;'>�����ǩ���ö��Ż��߿ո����</div>");
	a.push("<div style='margin-top:6px;text-align:right;color:#aaaaaa;'>��ǩ���������������</div>");
	
	return a.join("");
}

function isHotTag(sTag){
	var bHot = false;
	var e = hotTags.length;
	for(var i=0; i<e; i++){
		if(sTag == hotTags[i]){
			bHot = true;
			break;
		}
	}
	
	return bHot;
}
/**
 * �����Ƽ�tag��tabҳ���ڷ�ҳ
 * @param	{Number}	isPrev
 * 			0 -- ��һҳ��1 -- ��һҳ
 * @param	{String}	type
 * 			�Ƽ�tag����������
 * @param	{Number}	curPage
 * 			tabҳ���ڵ�ǰҳ
 * @param	{String}	inputId
 * 			element id
 * @return	{Void}
 * @see		#getSpecificRecomTagsHtml
 */
function recomTagDoPage(isPrev, type, curPage, inputId){
	var j, iPage;
	if(isPrev == 0){
		j = (curPage-2)*PAGE_NUM;
		iPage = parseInt(curPage) - 1;
	}
	else{
		j = curPage*PAGE_NUM;
		iPage = parseInt(curPage) + 1;
	}
	
	$('tagTabShowRecomTags').innerHTML = getSpecificRecomTagsHtml(type, j, iPage, inputId);
}

/**
 * ��ȡ���б�ǩ���ݵ�����
 * @param	{String}	type
 * 			�Ƽ�tag��tab����
 * @return	{Array}
 * 			���б�ǩ���ݵ�����
 */
function getRecomTagArrByType(type){
	var index = type - 1;
	if(index < recomTagArrs.length)
		return recomTagArrs[index];
	else	// Խ�磬���ص�һ��
		return recomTagArrs[0];
}

var beforeAddTag;
function  setElementValue(element, el){
	var value;
	if(isIE){
		value = el.innerText;
	}else{
		value = el.text;
	}
	
	if(value.indexOf(' ', 1)>0){
		value = "\"" + value + "\"" ;
	}
	
	var oDocOb = $(element);
	
	var tmp = "";
	if (oDocOb.value == "") {
		tmp = value;
	} else {
		tmp = oDocOb.value + "," + value;
	}
	
	if(oDocOb.maxLength == -1)	// δ����󳤶�ֵ,firefox��-1��ie���һ���ܴ��ֵ����Ӱ������߼�
		oDocOb.value = tmp;
	else {
		if(tmp.length > oDocOb.maxLength){
			alert("��ǩ�ѳ�������󳤶ȣ�");
			return;
		}
		else
			oDocOb.value = tmp;
	}
	
	if(beforeAddTag){
		beforeAddTag();
	}
	el.onclick = null;
	el.style.cursor = "default";
	el.style.color = "#aaa";
}
/** 
 * @fileoverview 
 * ��־���ҳ�����ർ����
 * 
 * @author  zhujingbo (zhujingbo@corp.netease.com) &&  zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 2.0 
 * @requires  utils.js
 * @requires  prototype.js
 * @see		  
 */

if (NEBlog==undefined){
	var NEBlog={};
}


NEBlog.EditBlogLeft = Class.create();

NEBlog.EditBlogLeft.recentComNumber = 5;
NEBlog.EditBlogLeft.archiveNumber = 8;

NEBlog.EditBlogLeft.aInfoId = ["_$_blog_class", "_$_blog_arch", "_$_blog_comm"];
NEBlog.EditBlogLeft.aInfoArrowId = ["divArrowCls", "divArrowArch", "divArrowCom"];
NEBlog.EditBlogLeft.sArchTitleId = "divYearArch";
NEBlog.EditBlogLeft.sArchContentId = "uYearArch";

NEBlog.EditBlogLeft.prototype = {
	/**
	 * EditBlogLeft�๹�캯�� ��ʼ��EditBlogLeft����Ԥ�����
	 * @constructor
	 * @param 	{String}	sObjectName  	EditBlogLeftʵ����������	
	 * @return 	{NEBlog.PrevBlogLeft} 		EditBlogLeft����
	 * @see 	#_init
	 */
	initialize: function(sObjectName, sParentName){
		/**
		 * ��ʼ������ѡ��
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({
			sTestOn				:	'off',		// ���Կ���on����off	
			sStyle  			:	null,		// ��־����ʽ��ַǰ׺
			sSel					: '-1',
			sSelId				: '-1'
		}, arguments[2]||{});
		/**
		 * ����ʵ������
		 * @private
		 * @type	String
		 */
		this._sObjectName = sObjectName;
		/**
		 * ���øĶ���ĸ����������
		 * @private
		 * @type	String
		 */
		this._sParentName = sParentName;
		/**
		 * ��Ϊblinddown����ʱ,��Ҫ������ͬ��״̬
		 * @private
		 * @type	Boolean
		 */
		this._bShowHiding = false;
		/**
		 * ���������
		 * @private
		 * @type	Objects
		 */
		this._oTester4EBL = null;
		
		this._bHasClass = false;
		/**
		 * �Ƿ����ɹ�"�鵵"ģ�������
		 * @private
		 * @type	Boolean
		 */
		this._bHasArchive = false;
		/**
		 * �Ƿ����ɹ�"��������"ģ�������
		 * @private
		 * @type	Boolean
		 */
		this._bHasRecentComments = false;
		/**
		 * ������������, ��prevBlog.jsʹ��
		 * @type	Array
		 */
		this._aRecentComments;
		
		this._aClasses = [];
		
		this._aArchives = [];
		
		this._aRcntComments = [];
		
		this._oWindowManager = null;
				
		this._init();
		
		return this;
	},

	_init: function() {		
		//��ʼ��ʱ������浵���������, ����һ�δ򿪵�ʱ�������,�����Ͳ����ظ�����
		if (this._oOptions.sTestOn == 'on')
			this._oTester4EBL = new NECtrl.SeleniumTester();
		
		if (this._oOptions.sSel == 'arch') {
			$(NEBlog.EditBlogLeft.aInfoId[1]).style.display = "block";
			//var _oArrow = $(NEBlog.EditBlogLeft.aInfoArrowId[1]);
			//_oArrow.className = _oArrow.className.replace("i70", "i68");
			BlogBean.getRecentArchives(UD.hostId, this._showArchives.bind(this));		
		}			
		else {
			$(NEBlog.EditBlogLeft.aInfoId[0]).style.display = "block";
			//var _oArrow = $(NEBlog.EditBlogLeft.aInfoArrowId[0]);
			//_oArrow.className = _oArrow.className.replace("i70", "i68");
			BlogBean.getBlogClasses(UD.hostId, this._showBlogClasses.bind(this));	
			this._bHasClass = true;	
		}
	},
	
	showHideInfo: function(iInfoId){
		if (this._bShowHiding == true)
			return;
		var _divCont = $(NEBlog.EditBlogLeft.aInfoId[iInfoId]);	
		if(_divCont.style.display=="none") {
			if(iInfoId == 1 && !this._bHasArchive) {//�鵵
				this._bHasArchive = true;
				//��ȡ�鵵
				BlogBean.getRecentArchives(UD.hostId, {
				  callback:function(dataFromServer) {
				    this._showArchives(dataFromServer);
				  }.bind(this)
				});	
			} else if(iInfoId == 2 && ! this._bHasRecentComments){//��������
				//��ȡ���������
				this._bHasRecentComments = true;
				BlogBean.getRecentComments(UD.hostId, NEBlog.EditBlogLeft.recentComNumber, this._showRecentComments);
			}	else if(iInfoId == 0 && ! this._bHasClass){//�������� 
				//��ȡ���������
				this._bHasClass = true;
				BlogBean.getBlogClasses(UD.hostId, this._showBlogClasses.bind(this));
			}	
			//var _oArrow = $(NEBlog.EditBlogLeft.aInfoArrowId[iInfoId]);
			//_oArrow.className = _oArrow.className.replace("i70", "i68");
			this._bShowHiding = true;
			Effect.BlindDown(_divCont,{duration:0.1, userCallBack: function(){this._bShowHiding = false;}.bind(this)});
		}
		else {
			//var _oArrow = $(NEBlog.EditBlogLeft.aInfoArrowId[iInfoId])
			//_oArrow.className = _oArrow.className.replace("i68", "i70");
			this._bShowHiding = true;
			Effect.BlindUp(_divCont,{duration:0.1, userCallBack: function(){this._bShowHiding = false;}.bind(this)});
		}
	},
	
	showHideArch: function(sIdSuffix){
	  if (this._bShowHiding == true)
			return;
	  var _divArchTitle = $(NEBlog.EditBlogLeft.sArchTitleId + sIdSuffix);
	  var _divArchContent = $(NEBlog.EditBlogLeft.sArchContentId + sIdSuffix);
	  if (_divArchContent.style.display=="none") {
	    _divArchTitle.className = _divArchTitle.className.replace("i29", "i46");
	    Effect.BlindDown(_divArchContent,{duration:0.1, userCallBack: function(){this._bShowHiding = false;}});
	  } else {
	    _divArchTitle.className = _divArchTitle.className.replace("i46", "i29");
	    Effect.BlindUp(_divArchContent,{duration:0.1, userCallBack: function(){this._bShowHiding = false;}});
	  }
	},
	
	_showBlogClasses: function(classes) {
		if (classes != null)
			this._aClasses = classes;
		var data = {classes: classes, pageName: UD.pageName, hostPath: UD.hostPath, 
				objectName: this._sObjectName, parentName: this._sParentName, selId: this._oOptions.sSelId};	
		$("_$_blog_class").innerHTML = jst_blog_edit_class.processUseCache(data);
		
		if (this._oTester4EBL) {
			if (classes == null || classes.length == 0) {
				this._sTest4EBL("LClass", "null");
			} else {
				var _aClsId = classes.pluck("id");
				this._sTest4EBL("LClass", _aClsId);
			}
		}	
	},
	
	refreshBlogClasses: function(cls, op) {
		if (this._aClasses == null)
			this._aClasses = [];
		if (cls != undefined && cls != null) {
			if (op == 'a')
				this._aClasses.push(cls);
			else if (op == 'd') {
				this._aClasses = this._aClasses.reject(function(e) {
					return e.id == cls.id;
				});		
			} else if (op == 'e') {
				for (var i = 0; i < this._aClasses.length; i++) {
					if (this._aClasses[i].id == cls.id) {
						this._aClasses[i].className = cls.className;
						break;
					}
				}
			}
		}
		this._showBlogClasses(this._aClasses);
	},
	 
	_showArchives: function(archives) {
		if (archives != null)
			this._aArchives = archives;
		var yearArchs = [];
		var yearIndex = -1;	
		var archiveCount = archives.length;
		for (var i = 0; i < archiveCount; i++) {
			var date = new Date(archives[i].archiveDate);
			var year = date.getFullYear();
			var month = parseInt(date.getMonth()) + 1;
			var count = 0;		
			count = archives[i].blogCount;
			if (count == 0) {
				continue;
			}
			if (yearIndex >= 0 && yearArchs[yearIndex].year == year) {
				var monthArch = new MonthArchive(year, month, count);
				yearArchs[yearIndex].archives.push(monthArch);
			} else {
				var yearArch = new YearArchive(year);
				var monthArch = new MonthArchive(year, month, count);
				yearArch.archives.push(monthArch);
				yearArchs.push(yearArch);
				yearIndex++;
			}
		}
		var data = {yearArchs: yearArchs, pageName: UD.pageName, hostPath: UD.hostPath, 
				objectName: this._sObjectName, parentName: this._sParentName, sel: this._oOptions.sSel, selId: this._oOptions.sSelId};
		$(NEBlog.EditBlogLeft.aInfoId[1]).innerHTML = jst_blog_edit_arch.processUseCache(data);
		
		if (this._oTester4EBL) {
			if(archives == null || archives.length == 0) {
				this._sTest4EBL("LArch", "null");
			} else {
				var _aArchId = archives.pluck("id");
				this._sTest4EBL("LArch", _aArchId);
			}
		}	
	},
	
	_showRecentComments :function(comments) {
		if (comments != null)
			this._aRcntComments = comments;
		for (var i = 0; i < comments.length; i++)
			comments[i].content = extractHtmlText(comments[i].content);
		var data = {comments: comments, hostPath: UD.hostPath};
		$(NEBlog.EditBlogLeft.aInfoId[2]).innerHTML = jst_blog_edit_rcntcom.processUseCache(data);
		this._aRecentComments = comments;
		
		if (this._oTester4EBL) {
			if (comments == null || comments.length == 0) {
				this._sTest4EBL("LRcntCom", "null");
			} else {
				var _aRcntComId = comments.pluck("id");
				this._sTest4EBL("LRcntCom", _aRcntComId);
			}
		}	
	},
	
	
	showClsAddDiv: function(op, refObj, offsetX, offsetY, oldClsId) {
		var _oRefObj = $(refObj);	
		var lfoffset = Position.cumulativeOffset(_oRefObj);	
		var _oClsDiv	
		if (op == "add") {
			_oClsDiv = $('addClsDiv');
		} else if (op == "edit") {
			_oClsDiv = $('editClsDiv');
			$("oldClsId").innerHTML = oldClsId;
		}
		if (offsetX == null || offsetX == -1)
			_oClsDiv.style.left=(lfoffset[0] + 80)+'px';
		else 
			_oClsDiv.style.left=(lfoffset[0] + offsetX)+'px';
		if (offsetY == null || offsetY == -1)
			_oClsDiv.style.top=(lfoffset[1])+'px';
		else
			_oClsDiv.style.top=(lfoffset[1] + offsetY)+'px';
		_oClsDiv.style.display='';
		
		if (op == "add") {
			$("txtNewClass4Add").focus();
		} else if (op == "edit") {
			$("txtNewClass4Edit").focus();
		}
		
		/*if(this._oWindowManager == null) {
			this._oWindowManager = new NetEase.JSWindowManager();
		}
		var clsAddWin = this._oWindowManager.showWindow("clsAddWin");
		if (clsAddWin == null) {
			clsAddWin = this._oWindowManager.createWindow("clsAddWin", 
				{title:"��ӷ���", 
				className:'g_win_0',
				onTop:true,
				width: 250,
				height: 100
				});
			clsAddWin.panel.innerHTML = '<table><tr><td height="80" align="center">'+
									        '<table border="0" cellspacing="4" cellpadding="5">'+
									          	'<tr><td align="left"><input id="txtNewClass" name="txtNewClass" type="text" size="30" maxlength="63"/></td></tr>'+
									          	'<tr><td align="right">'+
									            	'<input id="btnBlogClsOK" type="button" name="submitClassAdd" class="input_button" value="ȷ ��" onclick="' + this._sObjectName+ '.onSubmitClassAdd();">&nbsp;&nbsp;'+
									                '<input id="btnBlogClsCancel" type="button" name="cancelClassAdd" class="input_button" value="ȡ ��" onclick="' + this._sObjectName+ '.onCancelClassAdd();">'+
									            '</td></tr>'+
									        '</table>'+
									    '</td></tr></table>';
			
			clsAddWin.panel.innerHTML = 
				'<div class="g_c_mvdn"><input class="g_w_95" id="txtNewClass" name="txtNewClass" type="text" size="30" maxlength="63" /></div>'+
					'<div class="g_c_vmgin">'+
					'<a class="c g_c_button bd01 butn c05" id="btnBlogClsOK" name="submitClassAdd" onclick="' + this._sObjectName+ '.onSubmitClassAdd();">ȷ����</a>'+
					'<span>&nbsp;&nbsp;</span>'+
					'<a class="c g_c_button bd01 butn c05" id="btnBlogClsCancel" name="cancelClassAdd" onclick="' + this._sObjectName+ '.onCancelClassAdd();">ȡ����</a>'+
				'</div>';
			
			this._oWindowManager.showWindow("clsAddWin");
		}		*/
	},
	
	onSubmitClassAdd: function() {	
		var newClass = Trim($("txtNewClass4Add").value);
		if (newClass == "") {
			alert("������Ҫ��ӵķ������ƣ�");
			return false;
		}
		
		$('txtNewClass4Add').value='';
		this.ocClassAddWin();
		//��������������
		for (var i = 0; i < this._aClasses.length; i++) {
			if (newClass == this._aClasses[i].className) {
				alert("���Ѿ�������ͬ���ķ���,��ѡ��ͬ����!");
				return false;
			}
		}
					
		BlogBean.addClass(newClass, {
			  callback:function(dataFromServer) {
			    this._postClassAdd(dataFromServer, newClass);
			  }.bind(this),
			  errorHandler: function(ex) {
			  	filterWarning(ex, false);
			  	dwrlog('�������ʧ��', 'error');
			  }
			});
	},
	
	ocClassAddWin: function() {	
		var _oAddClsDiv = $('addClsDiv');
		if (_oAddClsDiv.style.display == 'none') {
			_oAddClsDiv.style.display='';
		} else {
			_oAddClsDiv.style.display='none';
		}
	},
	
	ocClassEditWin: function() {		
		var _oEditClsDiv = $('editClsDiv');
		if (_oEditClsDiv.style.display == 'none') {
			_oEditClsDiv.style.display='';
		} else {
			_oEditClsDiv.style.display='none';
		}
	},
	
	_postClassAdd: function(clsId, clsName) {
		if (clsId == -1) {
			alert("���Ѿ�������ͬ���ķ���,��ѡ��ͬ����!");
			return false;
		}
		
		if (NEBlog != null && NEBlog.gEditBlog != null) {
			NEBlog.gEditBlog.addToClassList(clsId, clsName);
		}
		
			
		// ˢ���������б�
		var clsObj = {id:clsId, className:clsName, blogCount:0};
		this.refreshBlogClasses(clsObj, "a");
	},
	
	
	onCancelClassAdd: function() {	
		
		var _oAddClsDiv = $('addClsDiv');
		_oAddClsDiv.style.display='none';
		$('txtNewClass4Add').value='';
	},
	
	onCancelClassEdit: function() {	
		
		var _oAddClsDiv = $('editClsDiv');
		_oAddClsDiv.style.display='none';
		$('txtNewClass4Edit').value='';
	},
	
	
	onSubmitClassEdit: function() {	
		var newClassId = $("oldClsId").innerHTML;
		var oldClassName;
		var newClassName = Trim($("txtNewClass4Edit").value);
		if (newClassName == "") {
			alert("�������µķ������ƣ�");
			return false;
		}
		
		$('txtNewClass4Edit').value='';
		this.ocClassEditWin();
		for (var i = 0; i < this._aClasses.length; i++) {
			if (newClassName == this._aClasses[i].className && newClassId != this._aClasses[i].id) {
				alert("�Ѵ���ͬ�����࣬�������������Ƶķ���!"  + newClassId + ", " + this._aClasses[i].id);
				return false;
			}
			if (newClassId == this._aClasses[i].id) {
				oldClassName = this._aClasses[i].className;
			}
		}
		
		BlogBean.updateClassByName({id: newClassId, className: newClassName}, oldClassName, {
			callback:function(dataFromServer) {
		    this._postClassEdit(dataFromServer, newClassId, newClassName);
		  }.bind(this),
			errorHandler: function(ex) {
				filterWarning(ex, false);
				dwrlog('�����޸�ʧ��', 'error');
			}
		});		
	},
	
		
	_postClassEdit: function(bSucc, clsId, clsName) {
		if (bSucc) {
			this.refreshBlogClasses({id: clsId, className: clsName}, "e");
			if (NEBlog != null && NEBlog.gEditBlog != null) {
				NEBlog.gEditBlog.editInClassList(clsId, clsName);
			}
			dwrlog('�����޸ĳɹ�', 'ok');
		}
	},
	
	onClassDel: function(clsId, clsName) {
		if (confirm("ȷ��Ҫɾ���÷�����\nɾ�����಻��ɾ���÷������־") == false) {
			return false;
		}
		BlogBean.deleteClass(clsId, clsName, {
			callback:function(dataFromServer) {
		    this._postClassDel(dataFromServer, clsId, clsName);
		  }.bind(this),
			errorHandler: function(ex) {
				dwrlog('����ɾ��ʧ��', 'error');
			}
		});
	},
	
	_postClassDel: function(bSucc, clsId, clsName) {
		if (bSucc) {
			this.refreshBlogClasses({id: clsId, className: clsName}, "d");
			if (NEBlog != null && NEBlog.gEditBlog != null) {
				NEBlog.gEditBlog.delFromClassList(clsId, clsName);
			}
			dwrlog('����ɾ���ɹ�', 'ok');
		}
	},
	
	
	keyDownInClass: function(op, e) {	
		var keycode;
		if (isIE)
			keycode = event.keyCode;
		else
			keycode = e.which;
		if (keycode == 13) {//�س�
			if (op == 'add')
				this.onSubmitClassAdd();
			else if (op == 'edit')
				this.onSubmitClassEdit();
		}
	},
	
	_sTest4EBL: function(sKey, vValues, sRelValue) {
		if (!this._oTester4EBL)
			return;
		switch (sKey) {
			case "LClass":
				this._oTester4EBL.setArray("LClass", vValues);
				break;
			case "LArch":
				this._oTester4EBL.setArray("LArch", vValues);
				break;
			case "LRcntCom":
				this._oTester4EBL.setArray("LRcntCom", vValues);
				break;
		}	
	}
	
}

//end



function YearArchive(year) {
	this.year = year;
	this.archives = [];	
}
function MonthArchive(year, month, count) {
	this.year = year;
	this.month = month;
	this.count = count;
	this.toStandardStr = function() {
		return this.year + '-' + this.month + '-' + '01';
	}
	this.toString = function() { 
		return this.year + '��' + this.month + '��';
	}
}


/**************************************************************
*				163 blog Blog Edit Page				  *
*                                                             *
* Written by:  zhujingbo &&  zhuyiwen                         *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0 above,Netscape.)           *
* Created Date: 2007-03-04									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * ��־�༭����ҳ��ʹ�õ�Javascript���ƴ���
 * 
 * @author  zhujingbo (zhujingbo@corp.netease.com) &&  zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 2.0 
 * @requires  utils.js
 * @requires  prototype.js
 */

if (NEBlog==undefined){
	var NEBlog={};
}

/**
 * ȫ�ֺ���, ��־�༭ҳ����ܲ�����Ƭ���ڵ��õ�ȫ�ֺ���
 * �˴���Ϊ�պ�������ҳ���ʼ��ʱ��ֵ��
 */
function addPhoto(){};

/**
 * ȫ�ֱ���, ��־�༭ҳ�����ʵ��, ����ftlҳ�����
 * @type	NEBlog.EditBlog
 */
NEBlog.gEditBlog = null;

/**
 * ȫ�ֺ���, ����PermaLinkPage����ʵ��, ftlҳ��onloadʱ����
 * @param	{String}	sServerName				����������
 * @param	{String}	sStyle					���͵���ʽ��ͼƬ�ĵ�ַǰ׺
 * @param	{String}	sBlogId					��ƪblog��id
 * @param	{Number}	iHostId					������id
 * @param	{Number}	iCommentRange			ÿҳ��ʾ����������
 * @param	{Number}	iCommentCount			��ƪ���͵���������
 * @param	{Number}	iGlobalAllowComment		�û����õ�����ȫ�ַ���Ȩ�� -100��ʾ�κ��˿����ۣ�0��ʾ��¼�û������ۣ�100��ʾ�������ۣ�10000��ʾ���ѿ�����
 * @param	{Number}	iVisitorId				�����ߴ�ƪblog���û�id
 * @param	{String}	sVisitorName			�����ߵ�����(����ͨ��֤ID)
 * @param	{String}	sVisitorNickname		�����ߵ��ǳ�
 * @param	{String}	sVisitorAvatar			�����ߵ�ͷ���ַ
 * @param	{String}	sVisitorIP				�����ߵ�IP
 * @param	{String}	sHostName				������hostName, ƴ��blog.163ǰ���û���
 * @param	{String}	sHostPath				������hostPath
 * @param	{Number}	iVisitorRank			��������ݵȼ���-100:������0:��½�û���100:���ѣ�10000:����
 * @param	{String}	sBlogTitle				��ƪ���ͱ���
 * @param	{String}	sBlogPermalink			���͵ľ�̬���ӵ�ַ, ��: blog/static/66779620070561956531
 * @param	{Number}	iSrl					��̬���Ӻ����Ψһ�����ִ�, ��66779620070561956531		
 * @param	{String}	sDivComShowId			ҳ����ʾ�������б���ʾ����div��id
 * @param	{String}	sDivComPubId			ҳ����ʾ�����۷�����div��id
 * @param	{String}	sCircleBaseUrl			Ȧ�ӵ�serverName
 * @param	{String}	sTestOn					�Ƿ���в���, on����off
 */
function gLoadEditBlog(sBlogId, sStyle, iCommentRange, iCommentCount, iTrackbackCount, bFromRef, bNewBlog, bPublished, iUserId, sTagOld, sClsId,
				bAbstractSysGen, sPhotoIds, sTestOn) {
	NEBlog.gEditBlog = new NEBlog.EditBlog('NEBlog.gEditBlog', {
		sBlogId: sBlogId, sStyle: sStyle, iCommentRange: iCommentRange, iCommentCount: iCommentCount, iTrackbackCount: iTrackbackCount,
		bFromRef: bFromRef, bNewBlog: bNewBlog, bPublished: bPublished, iUserId: iUserId, sTagOld: processTagUtilForCb(sTagOld.unescape_freemark()), sClsId: sClsId, 
		bAbstractSysGen: bAbstractSysGen, sPhotoIds: sPhotoIds, sTestOn: sTestOn});
	addPhoto = NEBlog.gEditBlog.addPhoto.bind(NEBlog.gEditBlog);
}

NEBlog.EditBlog = Class.create();

NEBlog.EditBlog.sComDivHookId = "_$_blog_edit_com";
NEBlog.EditBlog.sTbDivHookId = "_$_blog_edit_trackback";
NEBlog.EditBlog.sComDivId = "divComs";
NEBlog.EditBlog.sTbDivId = "divTbs";
NEBlog.EditBlog.iAutoSaveInterval = 1000*60*5;//ÿ5�����Զ�����һ��

NEBlog.oHtmlEditor = null;

NEBlog.EditBlog.prototype = {
	/**
	 * PrevBlog�๹�캯�� ��ʼ��PrevBlog����Ԥ�����
	 * @constructor
	 * @param 	{String}	sObjectName  	EditBlogLeftʵ����������	
	 * @return 	{NEBlog.PrevBlogLeft} 		EditBlogLeft����
	 * @see 	#_init
	 */
	initialize: function(sObjectName){
		/**
		 * ��ʼ������ѡ��
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({
			sBlogId				:	0,
			sStyle				: null,
			iCommentRange	: 10,
			iCommentCount	: 0,
			iTrackbackCount: 0,
			bFromRef			: false,
			bNewBlog			: true,
			bPublished		: true,
			iUserId				: 0,
			iContentMaxLen: 65500,
			sTagOld				: '',
			sClsId				: null,
			bAbstractSysGen: true, 
			sPhotoIds			: '',
			sTestOn				:	'off'
		}, arguments[1]||{});
				
		this._sObjectName = sObjectName;
		
		this.oEditBlogLeft = null;
		
		this._oTester4EB = null;
		
		this._oCommentPager = null;
		
		this.oHtmlEditor = null;
					
		this._bAutoSaved = false;
		
		this._sAutoSaveBlogId = '-1';
				
		this._aTrackbacks = null;
		
		this._aEmbedPhotos = [];	
		
		this._oPhotoWin = null;	
		
		this._init();
		
		return this;
	},
	
	_init: function() {
		if (this._oOptions.sTestOn == 'on')
			this._oTester4EB = new NECtrl.SeleniumTester();
			
			
		$("hint1").style.display = "block";
		if (isIE) 
			$("hint2").style.display = "block";
		
		//����focus�¼�
		var focusArray = ['title', 'abstract', 'trackbackurl'];
		attachFocusEvent(focusArray, "input_textbox_bright");
		var focusArray2 = ['editBlogTag'];
		attachFocusEvent2(focusArray2, "input_textbox_bright", showUserAllTags, null);
			
		var editorSrc = '/richTextEditor.do?bid=' + this._oOptions.sBlogId + '&r=' + this._oOptions.bFromRef + '&uid=' + this._oOptions.iUserId;
		
		this.oHtmlEditor = new NECtrl.HtmlEditor(this._oOptions.sBlogId, "edt", {sEditorSrc: editorSrc, sStyle: this._oOptions.sStyle,
					iWidth: 0, iHeight: 350, sObjName: "NEBlog.gEditBlog.oHtmlEditor", iMaxLen: this._oOptions.iContentMaxLen,
					fnPreview: this.toPreview, fnHideDiv:hideUserAllTags, oHideDivParmas:"editBlogTag"});
	
		// �趨һЩȫ�ֱ���
		NEBlog.oHtmlEditor = this.oHtmlEditor;
		
		//CircleBlogPushInfo = new NEBlog.EditBlog.CircleBlogPushInfo();
						
		if(window.attachEvent){	// ie
			document.attachEvent("onclick", function(e){
				var el = event.srcElement;
				
				if(el.id == "editBlogTag"){
					return;
				}else {
					var isClose = true;
					var tmp = el;
					while(tmp){
						if(tmp.id == "showUserTagsDiv_editBlogTag"){
							isClose = false;
							break;
						}
						tmp = tmp.parentNode;
					}
	
					if(isClose)
						hideUserAllTags("editBlogTag");
				}
			});
		}
		
		if(window.addEventListener){	// firefox
			document.addEventListener("click", function(e){
				var el = e.target;
				
				if(el.id == "editBlogTag"){
					return;
				}else {
					var isClose = true;
					var tmp = el;
					while(tmp){
						if(tmp.id == "showUserTagsDiv_editBlogTag"){
							isClose = false;
							break;
						}
						tmp = tmp.parentNode;
					}
					if(isClose)
						hideUserAllTags("editBlogTag");
				}
			},true);
		}
		
		this.oEditBlogLeft = new NEBlog.EditBlogLeft(this._sObjectName+".oEditBlogLeft", this._sObjectName, 
				{sTestOn: this._oOptions.sTestOn, sStyle: this._oOptions.sStyle});
		this._showComments();
		this._showTrackbacks();
		CircleBlogPushInfo.showCircles();
		
		window.setInterval(this._autoSave.bind(this), NEBlog.EditBlog.iAutoSaveInterval);
		
		/*try {
			//Photo.copyPhotos(photoIds,this._postAddPhoto.bind(this));
			Photo.recountAlbumCountInPhoto("_fks_I2i873i02Who5OJaHZkk6Q==", this.aaa.bind(this));
		}catch (ex) {
			alert(ex.message);
		}*/
				
	}, 
	
	_autoSave: function() {
		
		var content = this.oHtmlEditor.getContent();
		if (Trim(content) == "") {
			return false;
		}
		var title = $("title").value;
		var photoIds = '';
		var embedPIds = $("embedPhotoIds").value;
		if (this._oOptions.sPhotoIds != '' && embedPIds != '') {
			photoIds = this._oOptions.sPhotoIds + ";" + embedPIds;
		} else if (this._oOptions.sPhotoIds != '') {
			photoIds = this._oOptions.sPhotoIds;
		} else if (embedPIds != '') {
			photoIds = embedPIds;
		}
		
		BlogBean.autoSaveBlog(content, title, photoIds, !this._bAutoSaved, this._sAutoSaveBlogId, this._oOptions.sBlogId, {
			callback: function(dataFromServer) {
				if (!this._bAutoSaved) {
					this._sAutoSaveBlogId = dataFromServer;
					if (this._sAutoSaveBlogId != '-1')		
						this._bAutoSaved = true;
				}
			}.bind(this)
		});
	},
	
	
	_showComments: function() {
		if (this._oOptions.sBlogId != "") {//�༭blogʱ�ŷ���ģ��
			if (this._oOptions.iCommentCount > 0) {//������ʱ����ʾ����
				$(NEBlog.EditBlog.sComDivId).style.display = "block";
				var loadParam = {sBlogId: this._oOptions.sBlogId};
				var presentParam = {sBlogId: this._oOptions.sBlogId};
				this._newCommentPager(loadParam, presentParam);	
			}
		}	
	}, 
		
	_newCommentPager: function(loadParam, presentParam) {
		this._oCommentPager = new NetEase.CachePage({pageSize: this._oOptions.iCommentRange, prefetch: true, prefetchMulti: 2, markID: "comPageNav", styleDir: this._oOptions.sStyle, totalSize: this._oOptions.iCommentCount,
			loadFunc: this._loadComments, loadParam:loadParam, presentFunc: this._presentComments.bind(this), userPresentFuncParam: presentParam,
			delIterator: this._delComIt});
		this._oCommentPager.nextPage();
	},
	
	_loadComments: function(params, callback) {
		BlogBean.getComments(params.sBlogId, params.limit, params.offset, callback);
	},
	
	_presentComments: function(comments, params) {
		if (comments == null || comments.length == 0) {
			var comDiv = $(NEBlog.EditBlog.sComDivHookId);
			comDiv.style.display = "none";
			if (this._oTester4EB) {
				this._sTest4EB("Com", "null");
			}	
			return;
		}
		
		
		var data = {coms: comments, style: this._oOptions.sStyle, objectName: this._sObjectName};
		$(NEBlog.EditBlog.sComDivHookId).innerHTML = jst_blog_edit_com.processUseCache(data);
		
		if (this._oTester4EB) {
			var _aComId = comments.pluck("id");
			this._sTest4EB("Com", _aComId);
		}	
	},
	
	_delComIt: function(a, b) {
		return (a == b.id);
	},
	
	deleteComment: function(comId) {
		if (confirm("ȷ��Ҫɾ����������") == false) {
			return false;
		}
		$("delcom" + comId).disabled = true;
		BlogBean.deleteComment(comId, this._oOptions.sBlogId, {
		  callback:function(dataFromServer) {
		    this._postDeleteComment(dataFromServer, comId, this._oOptions.sBlogId);
		  }.bind(this),
		  errorHandler:function(ex) {
		  	$("delcom" + comId).disabled = false;
		  }
		});	
	},
	
	_postDeleteComment: function(succ, commentId, blogId) {
		if (succ == true) {		
			this._oCommentPager.removeOne(commentId);
			var comCount = $("comCount_" + blogId).innerHTML;
			$("comCount_" + blogId).innerHTML = parseInt(comCount) - 1;
			dwrlog('����ɾ���ɹ�', 'ok');
		} else {
			dwrlog('����ɾ��ʧ��', 'error');
		}
	},
	
	_showTrackbacks: function()  {
		if (this._oOptions.sBlogId != "") {//�༭blogʱ�ŷ���ģ��
			if (this._oOptions.iTrackbackCount > 0) {
				BlogBean.getTrackbacks(this._oOptions.sBlogId, {
				  callback:function(dataFromServer) {
				  	$(NEBlog.EditBlog.sTbDivId).style.display = "block";
				  	//ȫ�ֻ������� 
				  	this._aTrackbacks = dataFromServer;		  	
				    this._presentTrackbacks(this._aTrackbacks);
				  }.bind(this)
				});	
			}			
		}		
	},
	
	_presentTrackbacks: function(trackbacks) {	
		if (trackbacks == null || trackbacks.length == 0) {
			var tbsDiv = $("tbs");
			tbsDiv.style.display = "none";
			if (this._oTester4EB) {
				this._sTest4EB("Tb", null);
			}	
			return;
		}
		var data = {tbs: trackbacks, style: this._oOptions.sStyle, tbCount: this._oOptions.iTrackbackCount, objectName: this._sObjectName};
		$(NEBlog.EditBlog.sTbDivHookId).innerHTML = jst_blog_edit_trackback.processUseCache(data);
		
		if (this._oTester4EB) {
			var _aTbId = trackbacks.pluck("id");
			this._sTest4EB("Tb", _aTbId);
		}	
	},
	
	deleteTrackback: function(tbId) {
		if (confirm("ȷ��Ҫɾ����������") == false) {
			return false;
		}
		$("deltb_" + tbId).disabled = true;
		BlogBean.deleteTrackback(tbId, this._oOptions.sBlogId, {
		  callback:function(dataFromServer) {
		    this._postDeleteTrackback(dataFromServer, tbId);
		  }.bind(this),
		  errorHandler:function(ex) {
		  	$("deltb_" + tbId).disabled = false;
		  }
		});	
	},
	
	_postDeleteTrackback: function(succ, tbId) {
		if (succ == true) {		
			var i;
			for (i = 0; i < this._aTrackbacks.length; i++) {
				if (this._aTrackbacks[i].id == tbId) {
					break;	
				}
			}
			this._aTrackbacks.splice(i, 1);
			this._presentTrackbacks(this._aTrackbacks);
			var tbCount = $("tbCount").innerHTML;
			$("tbCount").innerHTML = parseInt(tbCount) - 1;	
			dwrlog('����ɾ���ɹ�', 'ok');
		} else {
			dwrlog('����ɾ��ʧ��', 'error');
		}
	},
	
	toPreview: function(content){
		$("previewsubtitle").style.display = "block";
		$("basic").style.display = "none";
		$("edt").style.display = "none";
		$("opt").style.display = "none";
		$("adv").style.display = "none";
		$("hint").style.display = "none";
		$("divComs").style.display = "none";
		$("divTbs").style.display = "none";
		
		//��ʾԤ������
		var prePad = $("previewpad");
		prePad.innerHTML = content;
		if(isIE)
			prePad.focus();	
		else {
			var previewtab = $("previewtab");
			previewtab.focus();
		}
	},
	
	toEdit: function(){   
		$("previewsubtitle").style.display = "none";
		
		$("basic").style.display = "";
		$("edt").style.display = "";
		$("opt").style.display = "";
		$("adv").style.display = "";
		$("hint").style.display = "";
		if (this._oOptions.iCommentCount > 0) {
			$("divComs").style.display = "";
		}
		if (this._oOptions.iTrackbackCount > 0) {
			$("divTbs").style.display = "";
		}
	},
	
	
	
	//blog����ѡ���ѡ�����ݷ����仯ʱ����
	changeClass: function(select) {
		if (select.selectedIndex == select.options.length - 1) 
			$("clsName").value = "";
		else
			$("clsName").value = select.options[select.selectedIndex].text;
		if (select.options[select.selectedIndex].value == "") {
			this.oEditBlogLeft.showClsAddDiv("add", "cls", 0, 20);
			select.selectedIndex = 0;
		}
	},
	
	addToClassList: function(clsId, clsName) {
		var oSelect = $("cls");
		if (oSelect != null) {
			var oOption = document.createElement("OPTION");
			oSelect.options.add(oOption, 1);
			oOption.text = clsName;
			oOption.value = clsId;
			oSelect.options[1].selected = true;
			$("clsName").value = clsName;
		}	
	},
	
	delFromClassList: function(clsId, clsName) {
		var oSelect = $("cls");
		if (oSelect != null) {
			var selIndex = oSelect.selectedIndex;
			for (var i = 0; i < oSelect.options.length; i++) {
				if (oSelect.options[i].value == clsId) {
					oSelect.remove(i);
					if (i == selIndex)
						oSelect.options[0].selected = true;
					break;
				}
			}
		}	
	},
	
	editInClassList: function(clsId, clsName) {
		var oSelect = $("cls");
		if (oSelect != null) {
			var selIndex = oSelect.selectedIndex;
			for (var i = 0; i < oSelect.options.length; i++) {
				if (oSelect.options[i].value == clsId) {
					oSelect.options[i].text = clsName;
					if (i == selIndex)
						$("clsName").value = clsName;
					break;
				}
			}
		}	
	},
	
	
	onPublish: function() {
		var pubbtn = $("pubbtns");
		pubbtn.className = "g_disable";
		var draftbtn = $("draftbtns");
		var draftOrigClass = draftbtn.className;
		draftbtn.className = "g_disable";
		//���������ֶ�
		if (this._checkField(this._oOptions.bAbstractSysGen) == false) {
			pubbtn.className = "";
			draftbtn.className = draftOrigClass;
			return false;
		}
		
		if (this._processTag() == false) {
			pubbtn.className = "";
			draftbtn.className = draftOrigClass;
			return false;
		}
		
		if (this._processTrackback() == false) {
			pubbtn.className = "";
			draftbtn.className = draftOrigClass;
			return false;
		}
		
		//processPic();
			
		var action;
		if (this._oOptions.bNewBlog == 1) {
			if (this._oOptions.sClsId == -1) {
				action = UD.hostPath + "/editBlog.do?p=1&n=1&c=0";//����&�½�&ԭ�Ȳ�����cbmap��Ӧ��ϵ
			} else {
				action = UD.hostPath + "/editBlog.do?p=1&n=1&c=1";//����&�½�&ԭ�ȴ���cbmap��Ӧ��ϵ
			}
		} else {
			if (this._oOptions.sClsId == -1) {
				action = UD.hostPath + "/editBlog.do?p=1&n=0&c=0";//����&����&ԭ�Ȳ�����cbmap��Ӧ��ϵ
			} else {
				action = UD.hostPath + "/editBlog.do?p=1&n=0&c=1";//����&����&ԭ�ȴ���cbmap��Ӧ��ϵ
			}
		}
	
		action += "&autoid=" + this._sAutoSaveBlogId;
		document.forms['editorForm'].action = action;
		document.forms['editorForm'].submit();
	},
	
	onSaveDraft: function() {	
		var draftbtn = $("draftbtns");
		draftbtn.className = "g_disable";
		var pubbtn = $("pubbtns");
		var pubOrigClass = pubbtn.className;
		pubbtn.className = "g_disable";
		//���������ֶ�
		if (this._checkField(this._oOptions.bAbstractSysGen) == false) {
			draftbtn.className = "";
			pubbtn.className = pubOrigClass;
			return false;
		}
		
		if (this._processTag() == false) {
			draftbtn.className = "";
			pubbtn.className = pubOrigClass;
			return false;
		}	
		
		if (this._processTrackback() == false) {
			draftbtn.className = "";
			pubbtn.className = pubOrigClass;
			return false;
		}
		
		//processPic();
		
		var action;	
		if (this._oOptions.bNewBlog == 1) {
			if (this._oOptions.sClsId == -1) {
				action = UD.hostPath + "/editBlog.do?p=0&n=1&c=0";//��ݸ�&�½�&ԭ�Ȳ�����cbmap��Ӧ��ϵ
			} else {
				action = UD.hostPath + "/editBlog.do?p=0&n=1&c=1";//��ݸ�&�½�&ԭ�ȴ���cbmap��Ӧ��ϵ
			}
		} else {
			if (this._oOptions.sClsId == -1) {
				action = UD.hostPath + "/editBlog.do?p=0&n=0&c=0";//��ݸ�&����&ԭ�Ȳ�����cbmap��Ӧ��ϵ
			} else {
				action = UD.hostPath + "/editBlog.do?p=0&n=0&c=1";//��ݸ�&����&ԭ�ȴ���cbmap��Ӧ��ϵ
			}
		}
		action += "&autoid=" + this._sAutoSaveBlogId;
		document.forms['editorForm'].action = action;
		document.forms['editorForm'].submit();
	},
	
	onCancel: function(hostName) {
		document.forms['editorForm'].action = "editBlogAll.do?host=" + hostName;
		document.forms['editorForm'].submit();
	},
	
	_checkField: function(abstractSysGen) {
		var input = document.forms['editorForm'].getElementsByTagName("INPUT");
		
		for (var i = 0; i < input.length; i++) {
			if (input[i].name == 'title') {
				var value = Trim(input[i].value);
				if (value == '') {
					showInfo("submithint", "��������⣡", "info");
					return false;
				}
				/*if (containsIllegalChar(value)) {
					alert("��������Ƿ��ַ������������ź�б�ܣ�");
					return false;
				}*/
			}			
		}
		
		//��ȡ���ı༭�������ݲ����к��������
		var content = this.oHtmlEditor.getContent();
		//����־���ݱ��浽������
		if (isIE){
			window.clipboardData.setData("Text", content);		
		}
		
		if (this.oHtmlEditor.IsExceedMaxLen()) {
			alert("��־���ݳ����������" + this._oOptions.iContentMaxLen + "�������±༭���ύ");
			return false;
		}
		
		if (this.oHtmlEditor.hasHarmCode()) {
			alert("��־���ݰ����к����룬�Ѿ������ˣ���༭�������ύ��");
			return false;
		}
		
		this._genAbstract(content, abstractSysGen);
		
		var submitAbstract = $("absGen").value;
		var stripedAbstract = stripData(submitAbstract, "");
		if (stripedAbstract.isHarm) {
			$("absGen").value = stripedAbstract.content;
			$("abstract").value = stripedAbstract.content;
			alert("��־ժҪ�����к����룬�Ѿ������ˣ���༭�������ύ��");
			return false;
		}		
	},
	
	_genAbstract: function(content, abstractSysGen) {
		//���ժҪ	
		var abs = $("abstract");
		if (abs != null) {
			var absvalue = Trim(abs.value);
			if (abstractSysGen == 1) {
				if (absvalue == "") {
					//var content = extractHtmlText(content);
					//$("absGen").value = content.substr(0, 255);
					$("absGen").value = "";
				} else {
					$("absGen").value = absvalue;
					$("absSysGen").value = 0;
				}
			} else if (abstractSysGen == 0) {
				if (absvalue == "") {
					/*var content = extractHtmlText(content);
					$("absGen").value = content.substr(0, 255);
					$("absSysGen").value = 1;*/
					$("absGen").value = "";
					$("absSysGen").value = 1;
				} else {
					$("absGen").value = absvalue;
				}
			}
		}	
	},
	
	
	 _processTag: function() {
		//���û������tag��ȥ�غ��������
		var tags = $("editBlogTag").value;
		/*if (containsIllegalChar(tags)) {
			alert("��ǩ�����Ƿ��ַ������������ź�б�ܣ�");
			return false;
		}*/
	
		//added by mml
		//ȥ������ 
		tags = processTagString(tags);
		tags = processTagUtilForCb(tags);	
			
		var tagInfoTemp = new Object();
		tagInfoTemp.numJoin = 0;
		tagInfoTemp.tags = tags;
		//����õ���Ҫ�Զ���ӵ��û�tag�����tag
		procTagsUtil(tagInfoTemp);
	//	$("numJoin").value = tagInfoTemp.numJoin;
		//�������� 
		$("processedTag").value = structQuotedTag(tagInfoTemp.tags.split(","));
		
		//�������ӡ�ɾ��tag�ַ���
		var tagInfoTemp1 = new Object();
		tagInfoTemp1.addTags = "";
		tagInfoTemp1.delTags = "";
		getAddDelTags(tagInfoTemp1, this._oOptions.sTagOld, tagInfoTemp.tags);
		
		//�������� 
		//��blog��Ҫ������tag
	//	$("addTags").value = structQuotedTag(tagInfoTemp1.addTags.split(","));
		//��blog��Ҫɾ����tag
	//	$("delTags").value = structQuotedTag(tagInfoTemp1.delTags.split(","));
		
		return true;
	},
	
	
	_processTrackback: function() {
		//�����õ�ַȥ�أ�ͳһʹ��Ӣ�ķֺ�
		var tb = $("trackbackurl");
		var newtb = "";
		if (tb != null) {
			var tbv = Trim(tb.value);
			if (tbv != "") {
				var regexp = /[;��]/;
				var tbs = tbv.split(regexp);
				tbs = removeSameEl(tbs);
				for (var i = 0; i < tbs.length; i++) {
					newtb += tbs[i];
					if (i < tbs.length - 1)
						newtb += ";";
				}
			}
		}
		if (newtb != "") {
			$("refurl").value = newtb;
		}
		
		return true;
	},
	
	switchTrackback: function() {
		if ($('openTB').value == 0) {	
			var Obj = {success: false};
			new Effect.BlindDown('tbinfo', {stateId: "tbinfo" + "_$$S$$", succObj: Obj, duration:0.1});
			
			if (Obj.success) {
				$('openTB').value = 1;	
				$('tbHead').className = $('tbHead').className.replace("i128", "i127");
			}
			else
				$('openTB').value = 0;
			
		} else {
			var Obj = {success: false};
			new Effect.BlindUp('tbinfo', {stateId: "tbinfo" + "_$$S$$", succObj: Obj, duration:0.1});
				
			if (Obj.success) {
				$('openTB').value = 0;	
				$('tbHead').className = $('tbHead').className.replace("i127", "i128");
			}
			else
				$('openTB').value = 1;
		}
	},
	
	switchAbstract: function() {
		if ($('openAbstract').value == 0) {	
			var Obj = {success: false};
			new Effect.BlindDown('abstractinfo', {stateId: "abstractinfo" + "_$$S$$", succObj: Obj, duration:0.1});
			
			if (Obj.success) {
				$('openAbstract').value = 1;	
				$('absHead').className = $('absHead').className.replace("i128", "i127");
			}
			else
				$('openAbstract').value = 0;
			
		} else {
			var Obj = {success: false};
			new Effect.BlindUp('abstractinfo', {stateId: "abstractinfo" + "_$$S$$", succObj: Obj, duration:0.1});
				
			if (Obj.success) {
				$('openAbstract').value = 0;	
				$('absHead').className = $('absHead').className.replace("i127", "i128");
			}
			else
				$('openAbstract').value = 1;
		}
	},
	
	openAddPhotoWin: function() {
		if (photolistTemplate == null)
			photolistTemplate = createJSTAndParse("photolist_jst", photolist_jst);	
		if (isIE){
			//var	photolist = window.showModalDialog("uploadBlogPhoto.do","","dialogHeight: 520px; dialogWidth: 790px; resizable: no; status: yes;scroll:no;"); 
			this._oPhotoWin = window.open("uploadBlogPhoto.do","","resizable=no,scrollbars=no,status=yes, width=785px, height=470px"); 
			//addPhoto(photolist);
		}
		else
			this._oPhotoWin = window.open("uploadBlogPhoto.do", "", "resizable=no,scrollbars=no,status=yes, width=785px, height=470px");
	},
	
	
	
	/*addPhoto: function(photolist, callback) {
		if (photolist == null)
			return false;
		var photoIds = [];
		for (var i = 0; i < photolist.length; i++) {
			photoIds.push(photolist[i].id);
		}
		Photo.copyPhotos(photoIds, {
			callback: function(dataFromServer) {
				callback();
		    this._postAddPhoto(dataFromServer, photolist);
		  }.bind(this),
		  errorHandler:function(ex) {
		  	callback();
				alert("����ͼƬ����");
		  }
		});
	},*/
	
	
	addPhoto: function(photolist) {			
		photolist.each(function(e){
			var photoId = e.mediumUrl.substring(e.mediumUrl.lastIndexOf("/") + 1, e.mediumUrl.lastIndexOf(".jpg"));
			if (this._aEmbedPhotos.detect(function(e){return e == photoId;}) == null) {
				this._aEmbedPhotos.push(photoId);
			}
			if (isIE) {
				this.oHtmlEditor.designEditor.focus();//�����ý��㣬����ͼƬ����뵽����
				//this.oHtmlEditor.designEditor.document.selection.createRange().pasteHTML('<a href="http://' + DomainMap.getParentDomain(UD.hostName) + '/album/prevPhoto.do?photoId=' + e.id + '" target="_blank"><img src="' + e.mediumUrl + '" /></a>') ; 
				this.oHtmlEditor.designEditor.document.selection.createRange().pasteHTML('<a href="' + e.mediumUrl + '" target="_blank"><img src="' + e.mediumUrl + '" /></a>') ; 
			}
			else {
				this.oHtmlEditor.designEditor.focus();//�����ý���
				var insertRangeObj = this.oHtmlEditor.designEditor.getSelection().getRangeAt(0);
				insertRangeObj.deleteContents();
				var newA = this.oHtmlEditor.designEditor.document.createElement("a");
				//newA.href = "http://" + DomainMap.getParentDomain(UD.hostName) + "/album/prevPhoto.do?photoId=" + e.id;
				newA.href = e.mediumUrl;
				newA.target = "_blank";
				var newImg = this.oHtmlEditor.designEditor.document.createElement("img");
				newImg.src = e.mediumUrl;
				newA.appendChild(newImg);
				insertRangeObj.insertNode(newA);
			}
		}.bind(this));	
		
		$("embedPhotoIds").value = this._aEmbedPhotos.toArray().join(";");

	},
	
	addRemotePhoto: function(photolist) {
		if (photolist == null)
			return false;
		photolist.each(function(e){ 
			ie = (document.all)? true:false
			if (ie) {
				this.oHtmlEditor.designEditor.focus();//�����ý��㣬����ͼƬ����뵽����
				this.oHtmlEditor.designEditor.document.selection.createRange().pasteHTML('<img src="' + e + '" />') ; 
			}
			else {
				this.oHtmlEditor.designEditor.focus();//�����ý���
				var insertRangeObj = this.oHtmlEditor.designEditor.getSelection().getRangeAt(0);
				insertRangeObj.deleteContents();
				var newImg = this.oHtmlEditor.designEditor.document.createElement("img");
				newImg.src = e;
				insertRangeObj.insertNode(newImg);
			}
		}.bind(this));	
	},
	
	
	
	_sTest4EB: function(sKey, vValues, sRelValue) {
		if (!this._oTester4EB)
			return;
		switch (sKey) {
			case "PushCircle":
				this._oTester4EB.setArray("PushCircle", vValues);
				break;
			case "PushedCircle":
				this._oTester4EB.setArray("PushedCircle", vValues);
				break;
			case "Com":
				this._oTester4EB.setArray("Com", vValues);
				break;
			case "Tb":
				this._oTester4EB.setArray("Tb", vValues);
				break;
		}	
	}
}



var CircleBlogPushInfo={
    pushedCircles: [],
    notPushedCircles: [],
    circleType1s: [],
    init: function(blogId, profileId){
        CircleBlogPushInfo.blogId=blogId;
        CircleBlogPushInfo.profileId=profileId;
    },
    getTypesWithCircles: function(){
        var userCircleType1s=CircleBlogPushInfo.getUserCircleType1s();
        var circleIndex=0;
        for (var i=0; i<userCircleType1s.length; i++){
           var type1Circles=CircleBlogPushInfo.getCirclesByType1(userCircleType1s[i].id);
           type1Circles.each( function(circle){
                circle.index=circleIndex++;
           });
           userCircleType1s[i].circles=type1Circles;
        }
        return userCircleType1s;
    },
    showCircles: function(){
        var circleType1s=CircleBlogPushInfo.getTypesWithCircles();
        if (circleType1s.length<=0){
            return;
        }
        Element.show("circleBlogPushDiv");
        var modle={circleType1s: circleType1s, circleBaseUrl: CircleBlogPushInfo.circleBaseUrl};
        ActionMapping.forward(modle, "type1CirclesDiv", "type1Circles_jst");
    },
    _enableCircleCheckbox: function(disabled){
        var userCircleType1s=CircleBlogPushInfo.getUserCircleType1s();
        for (var i=0; i<userCircleType1s.length; i++){
           var type1Circles=CircleBlogPushInfo.getCirclesByType1(userCircleType1s[i].id);
           type1Circles.each( function(circle){
                $("circleId"+circle.index).disabled=disabled;
           });
        }
    },
    enable: function(){
        if (!CircleBlogPushInfo.isBlogCanPushed()){
            return;
        }
        CircleBlogPushInfo._enableCircleCheckbox(false);
        //Element.show("type1CirclesDiv");
    },
    disable: function(){
        if (!CircleBlogPushInfo.isBlogCanPushed()){
            return;
        }
        CircleBlogPushInfo._enableCircleCheckbox(true);
        //$("circleType1Id").disabled=true;
        //Element.hide("type1CirclesDiv");
    },
    isBlogPushedBefore: function(){
       return (CircleBlogPushInfo.pushedCircles.length!=0);
    },
    isBlogCanPushed: function(){
       if (CircleBlogPushInfo.notPushedCircles.length==0){
            return false;
       }
       var pushedType1Id=CircleBlogPushInfo.getPushedCircleType1Id();
       //�ѱ�ĳ��������͹���, �Ͳ������͵����������. �������������ͬ����Ȧ�Ӿ�û��Ҫ��ʾ��
       if (pushedType1Id>0 && CircleBlogPushInfo.getCirclesByType1(pushedType1Id).length<=0){
            return false;
       }
       return true;
    },
    addPushedCircle: function(id, urlName, name, circleType1Id){
        CircleBlogPushInfo.pushedCircles.push({id: id, urlName: urlName, name: name, circleType1Id: circleType1Id});
    },
    getPushedCircleType1Id: function(){
        if (CircleBlogPushInfo.pushedCircles.length==0){
            return -1;
        }
        var circleType1Id=CircleBlogPushInfo.pushedCircles[0].circleType1Id;
        return circleType1Id;
    },
    addCircle: function(id, urlName, name, circleType1Id){
        CircleBlogPushInfo.notPushedCircles.push({id: id, urlName: urlName, name: name, circleType1Id: circleType1Id});
    },
    addCircleType1: function(id, name){
        CircleBlogPushInfo.circleType1s.push({id:id, name:name});
    },
    getCircleType1ById: function(id){
        var circleType1=CircleBlogPushInfo.circleType1s.find ( function(circleType1){
            return circleType1.id==id;
        });
        return circleType1;
    },
    getCirclesByType1: function(type1Id){
        var circles=CircleBlogPushInfo.notPushedCircles.findAll( function(curCircle){
            return curCircle.circleType1Id==type1Id;
        });
        return circles;
    },
    getUserCircleType1s: function(){
        var userCircleType1s=[];
        CircleBlogPushInfo.notPushedCircles.each( function(circle){
            var findCircleType1=userCircleType1s.find( function(circleType1){
                return circleType1.id==circle.circleType1Id;
            });
            if (findCircleType1==null){
                userCircleType1s.push(CircleBlogPushInfo.getCircleType1ById(circle.circleType1Id));
            }
        });
        return userCircleType1s;
    }
}

//end









//begin

if (NEBlog==undefined){
	var NEBlog={};
}

NEBlog.gEditBlogAll = null;

function gLoadEditBlogAll(sStyle, iTotalBlogCount, iBlogRange, iCommentRange, sBy, sById, iByCnt, sTestOn) {
	NEBlog.gEditBlogAll = new NEBlog.EditBlogAll('NEBlog.gEditBlogAll', {
		sStyle: sStyle, sTestOn: sTestOn, iTotalBlogCount: iTotalBlogCount, iBlogRange: iBlogRange, iCommentRange: iCommentRange,
		sBy: sBy, sById: sById, iByCnt: iByCnt});
}

NEBlog.EditBlogAll = Class.create();

NEBlog.EditBlogAll.sBlogDivId = "_$_blog_edit_list";
NEBlog.EditBlogAll.sComDivId = "_$_com_editall_";
NEBlog.EditBlogAll.sTbDivId = "_$_tb_editall_";

NEBlog.EditBlogAll.prototype = {
	initialize: function(sObjectName){
		/**
		 * ��ʼ������ѡ��
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({
			sTestOn				:	'off',		// ���Կ���on����off	
			sStyle  			:	null,		// ��־����ʽ��ַǰ׺
			iTotalBlogCount:	0,
			iBlogRange		:	10,
			iCommentRange	: 10,
			sBy						: -1,
			sById					: null,
			iByCnt				: 0
			
		}, arguments[1]||{});
		
		this._sObjectName = sObjectName;
		
		this.oEditBlogLeft = null;
		
		this._oTester4EBA = null;
		
		this._oBlogPager = null;
		
		this._aCommentPager = new Array(this._oOptions.iBlogRange);
		
		this._aTrackbacks = new Array(this._oOptions.iTotalBlogCount);
		
		this._init();
		
		return this;
	},

	_init: function() {
		if (this._oOptions.sTestOn == 'on')
			this._oTester4EBA = new NECtrl.SeleniumTester();
			
		this.oEditBlogLeft = new NEBlog.EditBlogLeft(this._sObjectName+".oEditBlogLeft", this._sObjectName, 
				{sTestOn: this._oOptions.sTestOn, sStyle: this._oOptions.sStyle, sSel: this._oOptions.sBy, sSelId: this._oOptions.sById});	
		if (this._oOptions.sBy == -1)
			this._showBlogs();		
		else {//��editBlogҳ����ת����
			if (this._oOptions.sBy == "cls") {
				this.openBlogsByClass(this._oOptions.sById, null, this._oOptions.iByCnt);
			
			}��else if(this._oOptions.sBy = "arch") {
				this.openBlogsByArchive(this._oOptions.sById, null, this._oOptions.iByCnt);
			}	
		}
		
	},
	
	_showBlogs: function() {		
		var loadParam = {loadType:"all"};
		var presentParam = {loadType:"all"};
		this._newBlogPager(this._oOptions.iTotalBlogCount, loadParam, presentParam);
	
	}, 
	
	_loadBlogs: function(params, callback) {
		if (params.loadType == "class") {
			BlogBean.getBlogsByClass(params.limit, params.offset, UD.hostId, false, UD.visitorRank, false, params.classId, callback);
			if (params.className != null)
				$("loadType").innerHTML = "����:" + params.className;
		} else if (params.loadType == "archive") {
			BlogBean.getBlogsByArchive(params.limit, params.offset, UD.hostId, false, UD.visitorRank, false, params.archDate, callback);
			if (params.archStr != null)
				$("loadType").innerHTML = "�浵:" + params.archStr;
		} else if (params.loadType == "all") {
			BlogBean.getBlogs(params.limit, params.offset, UD.hostId, false, UD.visitorRank, false, callback);
			$("loadType").innerHTML = "������־";
		} else {
			BlogBean.getBlogs(params.limit, params.offset, UD.hostId, false, UD.visitorRank, false, callback);
			$("loadType").innerHTML = "������־";
		}			
	},
	
	_presentBlog: function(blogs, params) {
		var data = {blogs: blogs, style: this._oOptions.sStyle, loadType: params.loadType, hostPath: spaceStaticData.hostPath, objectName: this._sObjectName};		
	
		$(NEBlog.EditBlogAll.sBlogDivId).innerHTML = jst_blog_edit_list.processUseCache(data);

		
		if (this._oTester4EBA) {
			if (blogs == null || blogs.length == 0) {
				this._sTest4EBA("Blog", "null");
			} else {
				var _aBId = blogs.pluck("id");
				this._sTest4EBA("Blog", _aBId);
			}
		}
	},
	
	_newBlogPager: function(blogCount, loadParam, presentParam) {
		this._oBlogPager = new NetEase.PageNumber({pageSize: this._oOptions.iBlogRange, markID: "blogPageNav:blogPageNav2", totalSize: blogCount,
			loadFunc: this._loadBlogs, loadParam:loadParam, presentFunc: this._presentBlog.bind(this), userPresentFuncParam: presentParam, needRefreshAfterUpdate:false,
			delIterator: this._delBlogIt, updateIterator: this._udtBlogIt, beforeID: "blogPageNav2", beforePrev: this._scrollToBlogTop, beforeNext: this._scrollToBlogTop,
			beforeChange:this._scrollToBlogTop});
		this._oBlogPager.show();	
	},
	
	_delBlogIt: function(a, b) {
		return (a == b.id);
	},
	
	_udtBlogIt: function(a, b) {
		return (a.id == b.id);
	},
	
	_scrollToBlogTop: function() {
		new Effect.ScrollTo(NEBlog.EditBlogAll.sBlogDivId, {duration:0.0});//�Զ�����
	},
	
	openBlogsAll: function(blogCount) {
		var loadParam = {loadType:"all"};
		var presentParam = {loadType:"all"};
		this._newBlogPager(blogCount, loadParam, presentParam);
	},
	
	openBlogsByClass: function(classId, className, blogCount) {
		if (blogCount == 0 && this._oBlogPager != null) {
			this._presentBlog(null, {loadType:"class", className: className});
			this._oBlogPager.reset();
			$("loadType").innerHTML = "����:" + className;
			return;
		}
		
		var loadParam = {loadType:"class", classId: classId, className: className};
		var presentParam = {loadType:"class"};
		this._newBlogPager(blogCount, loadParam, presentParam);
	},
	
	openBlogsByArchive: function(archDate, archStr, blogCount) {
		if (blogCount == 0 && this._oBlogPager != null) {
			this._presentBlog(null, {loadType:"archive", archStr: archStr});
			this._oBlogPager.reset();
			$("loadType").innerHTML = "�浵:" + archStr;
			return;
		}
		
		var loadParam = {loadType:"archive", archDate: archDate, archStr: archStr};
		var presentParam = {loadType:"archive"};
		this._newBlogPager(blogCount, loadParam, presentParam);
	},
	
	deleteBlog: function(blogId, isPublished, valid, publishTime, allowView, classId) {		
		if ($("delblog_" + blogId).disabled == true)
			return false;
		if (confirm("ȷ��Ҫɾ������־��") == false) {
			return false;
		}
		this._doDeleteBlog(blogId, isPublished, valid, publishTime, allowView, classId);
	},
	
	_doDeleteBlog: function(blogId, isPublished, valid, publishTime, allowView, classId) {
		$("delblog_" + blogId).disabled = true;
		var p = false;
		if (isPublished == 1 && valid < 12)
			p = true;
		var archiveDate = new Date(publishTime);
		archiveDate.setDate(1);
		archiveDate.setHours(0);
		archiveDate.setMinutes(0);
		archiveDate.setSeconds(0);
		archiveDate.setMilliseconds(0);
		BlogBean.deleteBlog(blogId, p, publishTime, allowView, {
		  callback:function(dataFromServer) {
		    this._postDeleteBlog(dataFromServer, blogId, classId, archiveDate.getTime(), p);
		  }.bind(this),
		  errorHandler:function(ex) {
		  	$("delblog_" + blogId).disabled = false;
		  	
		  	if (ex == undefined || ex == null ||
						ex.type != "DelSysRecomException") {
					return false;
				}
				
				alert("����־�Ѿ���ϵͳ�Ƽ�, ����ɾ��!");
		  }
		});
	},
	
	_postDeleteBlog: function(succ, blogId, classId, archiveDate, isPublished) {
		if (succ == true) {
			this._oBlogPager.removeOne(blogId);
			for(var i = 0; i < this.oEditBlogLeft._aClasses.length; i++) {				
				if (this.oEditBlogLeft._aClasses[i].id == classId) {
					this.oEditBlogLeft._aClasses[i].blogCount -= 1;
					if (isPublished) {
						this.oEditBlogLeft._aClasses[i].publishedBlogCount -= 1;
					}
					break;
				}
			}
			this.oEditBlogLeft._showBlogClasses(this.oEditBlogLeft._aClasses);
			
			for(var i = 0; i < this.oEditBlogLeft._aArchives.length; i++) {				
				if (this.oEditBlogLeft._aArchives[i].archiveDate == archiveDate) {
					this.oEditBlogLeft._aArchives[i].blogCount -= 1;
					if (isPublished) {
						this.oEditBlogLeft._aArchives[i].publishedBlogCount -= 1;
					}
					break;
				}
			}		
			this.oEditBlogLeft._showArchives(this.oEditBlogLeft._aArchives);
			
			if (this.oEditBlogLeft._aRcntComments != null && this.oEditBlogLeft._aRcntComments.length > 0) {
				this.oEditBlogLeft._aRcntComments = this.oEditBlogLeft._aRcntComments.reject(function(e) {
					return e.blogId == blogId;
				});				
				this.oEditBlogLeft._showRecentComments(this.oEditBlogLeft._aRcntComments);
			}
			dwrlog('��־ɾ���ɹ�', 'ok');
		} else {
			dwrlog('��־ɾ��ʧ��', 'error');
		}	
	},
	
	_loadComments: function(params, callback) {
		BlogBean.getComments(params.blogId, params.limit, params.offset, callback);
	},

	_presentComments: function(comments, params) {
		if (comments == null || comments.length == 0) {
			var comDiv = $("blogshowcomment_" + params.blogId);
			comDiv.style.display = "none";
			if (this._oTester4EBA) {
				this._sTest4EBA("Com", "null");
			}
			return;
		}
		
		//new Effect.ScrollTo("comDiv_" + params.blogId, {duration:0.0});// ������ģ���ײ�
		
		var comDiv = $(NEBlog.EditBlogAll.sComDivId + params.blogId);
		if (comDiv.style.display == "none") {
			var data = {comments: comments, style: this._oOptions.sStyle, blogId: params.blogId, objectName: this._sObjectName};
			comDiv.innerHTML = jst_blog_com_editall.processUseCache(data);
			this._upDownComments(params.blogId);	
			$('open_' + params.blogId).value = 1;
		} else {
			var data = {comments: comments, style: this._oOptions.sStyle, blogId: params.blogId, objectName: this._sObjectName};
			
			
			comDiv.innerHTML = jst_blog_com_editall.processUseCache(data);
		}
			
		if (this._oTester4EBA) {
			var _aCId = comments.pluck("id");
			this._sTest4EBA("Com", _aCId, params.blogId);
		}
	},

	_openComments: function(blogId, commentCount) {
		var loadParam = {blogId: blogId};
		var presentParam = {blogId: blogId, commentCount: commentCount};
		this._newCommentPager(blogId, commentCount, loadParam, presentParam);
	},
	
	
	_newCommentPager: function(blogId, commentCount, loadParam, presentParam) {	
		this._aCommentPager[blogId] = new NetEase.CachePage({pageSize: this._oOptions.iCommentRange, prefetch: true, prefetchMulti: 2, markID: "comPageNav_"+blogId, styleDir: this._oOptions.sStyle, totalSize: commentCount,
			loadFunc: this._loadComments.bind(this), loadParam:loadParam, presentFunc: this._presentComments.bind(this), userPresentFuncParam: presentParam,
			delIterator: this._delComIt});
		this._aCommentPager[blogId].nextPage();
	},
	
	_delComIt: function(a, b) {
		return (a == b.id);
	},
	
	switchComments: function(blogId, comCount) {
		if(document.getElementById('ul_' + blogId) == null) {
			this._openComments(blogId, comCount);		
		}
		else {
			this._upDownComments(blogId);
		}
	},
	
	_upDownComments: function(blogId) {
		if($('open_' + blogId).value == 0) { //����ģ��رգ��ô���������ģ��
			var Obj = {success: false};
			$("comPageNav_" + blogId).style.display = "";
			new Effect.BlindDown(NEBlog.EditBlogAll.sComDivId + blogId, {stateId: blogId + "_$$S$$", succObj: Obj, duration:0.5});
			
			if (Obj.success) {
				$('open_' + blogId).value = 1;	
				var img = $("imgCom" + blogId);
				img.className = img.className.replace("i128", "i127");
			}
			else
				$('open_' + blogId).value = 0;	
		}
		else { //����ģ��򿪣��ô�����ر�
			var Obj = {success: false};
			$("comPageNav_" + blogId).style.display = "none";
			new Effect.BlindUp(NEBlog.EditBlogAll.sComDivId + blogId, {stateId: blogId + "_$$S$$", succObj: Obj, duration:0.5});
				
			if (Obj.success) {
				$('open_' + blogId).value = 0;	
				var img = $("imgCom" + blogId);
				img.className = img.className.replace("i127", "i128");
			}
			else
				$('open_' + blogId).value = 1;
		}
	},
	
	deleteComment: function(comId, blogId) {
		if (confirm("ȷ��Ҫɾ����������") == false) {
			return false;
		}
		$("delcom_" + comId).disabled = true;
		BlogBean.deleteComment(comId, blogId, {
		  callback:function(dataFromServer) {
		    this._postDeleteComment(dataFromServer, comId, blogId);
		  }.bind(this),
		  errorHandler:function(ex) {
		  	$("delcom_" + comId).disabled = false;
		  }
		});	
	},
	
	_postDeleteComment: function(succ, commentId, blogId) {
		if (succ == true) {		
			this._aCommentPager[blogId].removeOne(commentId);		
			var comCount = $("comCount_" + blogId).innerHTML;
			var newCount = parseInt(comCount) - 1;
			$("comCount_" + blogId).innerHTML = newCount;
			var obj = {};
			obj.id = blogId;
			obj.commentCount = newCount;
			this._oBlogPager.updateOne(obj);
			
						
			if (this.oEditBlogLeft._aRcntComments != null && this.oEditBlogLeft._aRcntComments.length > 0) {
				this.oEditBlogLeft._aRcntComments = this.oEditBlogLeft._aRcntComments.reject(function(e) {
					return e.id == commentId;
				});				
				this.oEditBlogLeft._showRecentComments(this.oEditBlogLeft._aRcntComments);
			}
			dwrlog('����ɾ���ɹ�', 'ok');
		} else {
			dwrlog('����ɾ��ʧ��', 'error');
		}
	},
	
	switchTrackback: function(blogId) {	
		if($('ulTrackback_' + blogId) == null) {	
			if (this._aTrackbacks !=null && this._aTrackbacks[blogId] != null) {//�Ѿ��ڻ�����
				this._showTrackbacks(this._aTrackbacks[blogId], blogId);
			} else {		
				BlogBean.getTrackbacks(blogId, {
				  callback:function(dataFromServer) {
				  	//ȫ�ֻ�������
				  	this._aTrackbacks[blogId] = dataFromServer;
				    this._showTrackbacks(dataFromServer, blogId);
				  }.bind(this)
				});	
			}	
		}
		else {
			this._upDownTrackbacks(blogId);
		}
	},
	
	_upDownTrackbacks: function(blogId) {
		if($('open2_' + blogId).value == 0) { //����ģ��رգ��ô���������ģ��
			var Obj = {success: false};
			new Effect.BlindDown(NEBlog.EditBlogAll.sTbDivId + blogId, {stateId: blogId + "_$$S$$", succObj: Obj, duration:0.5});
			
			if (Obj.success) {
				$('open2_' + blogId).value = 1;	
				var img = $("imgTb" + blogId);
				img.className = img.className.replace("i128", "i127");
			}
			else
				$('open2_' + blogId).value = 0;	
		}
		else { //����ģ��򿪣��ô����ر���
			var Obj = {success: false};
			new Effect.BlindUp(NEBlog.EditBlogAll.sTbDivId + blogId, {stateId: blogId + "_$$S$$", succObj: Obj, duration:0.5});
				
			if (Obj.success) {
				$('open2_' + blogId).value = 0;	
				var img = $("imgTb" + blogId);
				img.className = img.className.replace("i127", "i128");
			}
			else
				$('open2_' + blogId).value = 1;
		}
	},
	
	_showTrackbacks: function(tbsList, blogId) {
		if (tbsList == null || tbsList.length == 0) {
			var tbsDiv = $("tbsdiv_" + blogId);
			tbsDiv.style.display = "none";
			if (this._oTester4EBA) {
				this._sTest4EBA("Tb", "null");
			}
			return;
		}
		
		var data = {trackbacks:tbsList, blogId:blogId, style: this._oOptions.sStyle, objectName: this._sObjectName};
		
		var tbDiv = $(NEBlog.EditBlogAll.sTbDivId + blogId);
		tbDiv.innerHTML = jst_blog_editall_trackback.processUseCache(data);
		if (tbDiv.style.display == "none") {
			this._upDownTrackbacks(blogId);	
			$('open2_' + blogId).value = 1;
			var img = $("imgTb" + blogId);
				img.className = img.className.replace("i128", "i127");
		}
		
		if (this._oTester4EBA) {
			var _aTId = tbsList.pluck("id");
			this._sTest4EBA("Tb", _aTId, blogId);
		}
	},
	
	deleteTrackback: function(tbId, blogId) {
		if (confirm("ȷ��Ҫɾ����������") == false) {
			return false;
		}
		$("deltb_" + tbId).disabled = true;
		BlogBean.deleteTrackback(tbId, blogId, {
		  callback:function(dataFromServer) {
		    this._postDeleteTrackback(dataFromServer, tbId, blogId);
		  }.bind(this),
		  errorHandler:function(ex) {
		  	$("deltb_" + tbId).disabled = false;
		  }
		});	
	},
	
	_postDeleteTrackback: function(succ, tbId, blogId) {
		if (succ == true) {
			var i;
			for (i = 0; i < this._aTrackbacks[blogId].length; i++) {
				if (this._aTrackbacks[blogId][i].id == tbId) {
					break;	
				}
			}
			this._aTrackbacks[blogId].splice(i, 1);
			this._showTrackbacks(this._aTrackbacks[blogId], blogId);
			var tbCount = $("tbCount_" + blogId).innerHTML;
			$("tbCount_" + blogId).innerHTML = parseInt(tbCount) - 1;
			dwrlog('����ɾ���ɹ�', 'ok');
		} else {
			dwrlog('����ɾ��ʧ��', 'error');
		}
	},
	
	
	_sTest4EBA: function(sKey, vValues, sRelValue) {
		if (!this._oTester4EBA)
			return;
		switch (sKey) {
			case "Blog":
				this._oTester4EBA.setArray("Blog", vValues);
				break;
			case "Com":
				this._oTester4EBA.set2DArray("Com", vValues, "Blog", sRelValue);
				break;
			case "Tb":
				this._oTester4EBA.set2DArray("Tb", vValues, "Blog", sRelValue);
				break;
			case "Class":
				this._oTester4EBA.setArray("Class", vValues);
				break;
		}	
	}
	
}

//end


var ActionMapping={
  forward: function(model, view, template){
     Logger.debug("ActionMapping  model: "+$H(model).inspect()+" view:"+view+" template:"+template);
      var result = TrimPath.processDOMTemplate(template, model);
      if (template=="type1Circles_jst"){
        Logger.debug(result);
      }
      $(view).innerHTML=result;	  
  },

  redirect: function(url){
    window.location=url;
  }
}


var PopDialog={
    pageLayer: new NetEase.PageLayer(),
	_show: function(model, view, template, baseElement, offset, options){ //��ʾ�����Ի���, baseElement�ǻ�׼��Ԫ��, offset��ƫ����
		var htmlStr=TrimPath.processDOMTemplate(template, model);
        PopDialog.showDialog(htmlStr, view, baseElement, offset, options);
	},
    showDialog: function(htmlStr, view, baseElement, offset, options){
        var viewElement=$(view);
        viewElement.innerHTML=htmlStr;
        var baseElementPos=Position.cumulativeOffset($(baseElement));
        var dialogLeft=baseElementPos[0]+offset.left;
        var dialogTop=baseElementPos[1]+offset.top;
        if (options!=null && options.adjustPos==true){
        	if (dialogLeft+options.width>990){
        		dialogLeft-=options.width;
        	}
        }
        var dialogStyle= {left:dialogLeft+"px", top:dialogTop+"px"};
        Element.setStyle(view,dialogStyle);
    },
    setDialogContent: function(model, view, template){
		var htmlStr=TrimPath.processDOMTemplate(template, model);
        $(view).innerHTML=htmlStr;
    },
	showEffect: function(model, view, template, baseElement, offset, options){
		PopDialog._show(model, view, template, baseElement, offset);
        Effect.SlideDown(view,{duration:0.2, userCallBack: function(){} });
	},
	hideEffect: function(view){
        Effect.SlideUp(view,{duration:0.2});
	},
	showOrHideEffect: function(model, view, template, baseElement, offset, options){
        if($(view).style.display=="none" || (baseElement!=PopDialog.baseElement)){
            PopDialog.showEffect(model, view, template, baseElement, offset);
        }
        else if (baseElement==PopDialog.baseElement){
        	PopDialog.hideEffect(view);
        }
        PopDialog.baseElement=baseElement;
	},
	showLayer: function(model, view, template, baseElement, offset,options){
		PopDialog._show(model, view, template, baseElement, offset,options);
        PopDialog.pageLayer.addLayer({layerID: view, oneLayer:true});
	},
	hideLayer: function(view){
        Element.hide(view);
        PopDialog.pageLayer.removeLayer(view);
	},
	showOrHideLayer: function(model, view, template, baseElement, offset, options){
        if($(view).style.display=="none"|| (baseElement!=PopDialog.baseElement)){
            PopDialog.showLayer(model, view, template, baseElement, offset, options);
        }
        else if (baseElement==PopDialog.baseElement){
        	PopDialog.hideLayer(view);
        }
        PopDialog.baseElement=baseElement;
	},
    showContentLayer: function(htmlContent, view, baseElement, offset, options){
		PopDialog.showDialog(htmlContent, view, baseElement, offset,options);
        PopDialog.pageLayer.addLayer({layerID: view, oneLayer:true});
    },
    showOrHideContentLayer: function(htmlContent, view, baseElement, offset, options){
        if($(view).style.display=="none"|| (baseElement!=PopDialog.baseElement)){
            PopDialog.showLayer(model, view, template, baseElement, offset, options);
        }
        else if (baseElement==PopDialog.baseElement){
        	PopDialog.hideLayer(view);
        }
        PopDialog.baseElement=baseElement;
    },
    showContentEffect: function(htmlContent, view, baseElement, offset, options){
		PopDialog.showDialog(htmlContent, view, baseElement, offset,options);
        Effect.SlideDown(view,{duration:0.2, userCallBack: function(){} });
    },
    showOrHideContentEffect: function(htmlContent, view, baseElement, offset, options){
        if($(view).style.display=="none"|| (baseElement!=PopDialog.baseElement)){
            PopDialog.showEffect(model, view, template, baseElement, offset, options);
        }
        else if (baseElement==PopDialog.baseElement){
        	PopDialog.hideEffect(view);
        }
        PopDialog.baseElement=baseElement;
    }
}
function $FR(element,time){
  var value=null;
  for (var i=0;i<time; i++){
     var elementValue=$F(element+i);
     if  (elementValue!=null && elementValue!="undefined") {
       value=elementValue;
       if (value=="true") value=true;
       if (value=="false") value=false;
       break;
     }
  };
  return value;
}


function $FC(element,time){
  var values=[];
  for (var i=0; i<time; i++){
     var elementValue=$F(element+i);
     if  (elementValue!=null && elementValue!="undefined") {
          //Logger.debug(" element: "+elementValue);
          values.push(elementValue);
    }
  }
  return values;
}

/*function showHideContent (contentId, arrowId, style){
    var arrowImg=$(arrowId);
    Logger.debug("contentId: "+contentId);
    if($(contentId).style.display=="none"){
        new Effect.BlindDown(contentId, {duration:0.2, userCallBack: function(){ } });
        arrowImg.src=style+"/ico_up.gif";
    }else{
        new Effect.BlindUp(contentId, {duration:0.2, userCallBack: function(){ } });
        arrowImg.src=style+"/ico_down.gif";
    }
}*/
function showHideContent (contentId, arrowId, style,upImg,downImg){
    var arrowImg=$(arrowId);
    var realUpImg,realDownImg;
    realUpImg=(null==upImg)?"/ico_up.gif":upImg;
    realDownImg=(null==downImg)?"/ico_down.gif":downImg;
    if($(contentId).style.display=="none"){
        new Effect.BlindDown(contentId, {duration:0.2, userCallBack: function(){ } });
        arrowImg.src=style+realUpImg;
    }else{
        new Effect.BlindUp(contentId, {duration:0.2, userCallBack: function(){ } });
        arrowImg.src=style+realDownImg;
    }
}
/*
function showHideContent (contentId, arrowId, style,upImg,downImg){
    var arrowImg=$(arrowId);
    Logger.debug("contentId: "+contentId);
    if($(contentId).style.display=="none"){
        new Effect.BlindDown(contentId, {duration:0.2, userCallBack: function(){ } });
        arrowImg.src=style+upImg;
    }else{
        new Effect.BlindUp(contentId, {duration:0.2, userCallBack: function(){ } });
        arrowImg.src=style+downImg;
    }
}
*/

var CommonSearchPanel={
    onClickTextInput: function(ele,value){	
        if($(ele).value == value){
            $(ele).value='';
            $(ele).style.color='#41586c';		
        }
    },

    onBlurTextInput: function(ele, value){
        $(ele).value=value;
        $(ele).style.color='#adadad';	
    }
}

//����id�õ�����, ����ȥ������Ԫ��Ϊ: {id:x, name:x}
var IdToName={
	convert: function(id, nameArray){
        var data=nameArray.find( function(curData){
            return curData.id==id;
        });
        if (null==data){
            return "";
        }
        return data.name;
	}
}

var DateFormat={
	format: function(date){
		return NetEase.DateTime.formatDate(date.getTime(),"yyyy-MM-dd");
	},
    formatTime: function(time){
		return NetEase.DateTime.formatDate(time,"yyyy-MM-dd");
    }
}



function trimStr(str, length){
	if (str==null){
		return "null string";
	}
	var needTrim=(str.length>length);
	if (needTrim){
		return str.substr(0,length)+"...";	
	}
	else{
		return str;
	}
}

//�����ĳ�����: һ�������ַ��൱����Ӣ���ַ�
function trimChStr(str, length){
	if (str==null){
		return "null string";
	}
    var i = 0;
    var j=0;
    var trimStr="";
    for (i = 0; i< str.length; i++) {     
	     if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
	        j=j+2;  
	     }
	     else {
	        j=j+1
	     }   
	     //Logger.debug("str: "+str+" length: "+length+" j: "+j+" i: "+i);
	     if (length<j){
	     	break;
	     }
    }  //����FORѭ��
    var counter=i;
    //Logger.debug("trim counter is "+counter);
    var needTrim=(str.length>counter);
	if (needTrim){
		return str.substr(0,counter)+"...";	
	}
	else{
		return str;
	}    
}
//���һ���ַ����ĳ��ȣ���������2��,Ӣ����ĸ��1��
function getStrLength(str){
	if (str==null){
		return 0;
	}
    var i = 0;
    var j=0;
	 for (i = 0; i< str.length; i++) {     
	     if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94) {
	        j=j+2;  
	     }
	     else {
	        j=j+1
	     }   
	 } 
	 return j;
}
function changeButtonDisable(e,flag){
	cls=e.className;
	if(flag==true){
		cls=cls.replace(/ enableButton/gi,"");
		cls=cls.replace(/ disableButton/gi,"");
		cls+=" disableButton";
		e.className=cls;
	}
	else{
		cls=cls.replace(/ disableButton/gi,"");
		cls=cls.replace(/ enableButton/gi,"");
		cls+=" enableButton";
		e.className=cls;
	}
}

function addSelect(obj){
	if(null==obj)
		return;
	else
		obj.className+=" selectItem";
}

function removeSelect(obj){
	if(null==obj)
		return;
	else
		obj.className=obj.className.replace(/selectItem/gi,'');
}

function addUnderline(obj){
	if(null==obj)
		return;
	else
		obj.style.textDecoration="underline";
}

function removeUnderline(obj){
	if(null==obj)
		return;
	else
		obj.style.textDecoration='none';
}
/**
 * Convenience method for stopPropagation + preventDefault
 * @param {Event} ev the event
 */
function fStopEvent(ev) {
	if(!ev) ev = this.getEvent();
	this.fStopPropagation(ev);
	this.fPreventDefault(ev);
}
/**
 * Returns the event, should not be necessary for user to call
 * @param {Event} the event parameter from the handler
 * @return {Event} the event 
 */
function fGetEvent (e) {
	var ev = e || window.event;
	if (!ev) {
		var c = this.getEvent.caller;
		while (c) {
			ev = c.arguments[0];
			if (ev && Event == ev.constructor) {
			break;
			}
		c = c.caller;
		}
	}
	return ev;
}
/**
 * Stops event propagation
 * @param {Event} ev the event
 */
function fStopPropagation(ev) {
	if(!ev) ev = this.getEvent();
	if (ev.stopPropagation) {
		ev.stopPropagation();
	} else {
		ev.cancelBubble = true;
	}
}

/**
 * Prevents the default behavior of the event
 * @param {Event} ev the event
 */
function fPreventDefault(ev) {
	if(!ev) ev = this.getEvent();
	if (ev.preventDefault) {
		ev.preventDefault();
	} else {
		ev.returnValue = false;
	}
}
//������2006-10-11��ת��Ϊ Date ����,������
function dateConverter(dateStr){
	    var times=dateStr.split("-");
        var curDate=new Date(times[0], times[1]-1, times[2]);
        return curDate;
}
function formatCircleImageUrl(url){
	if(url !=null && url != "-5000")
		return url;
	return "/style/common/group_default140.gif";
}

/**
 * ��־ģ���������б�
 * @type String
 */
var jst_blog_edit_class = new String('\
		<div class="g_h_20 b"><a id="addClass" class="c05" href="javascript:;" onclick="${objectName}.showClsAddDiv(\'add\', \'addClass\', -1, -1);"><span class="n_ e10_1 c05">&nbsp;</span>��ӷ���</a></div>\
    {if classes != null && classes.length != 0}\
    {for cls in classes}\
    <div class="g_h_18 g_htc_hvr i c06">\
    	 {if (pageName == "editBlogAll")}\
      	<p  class="g_t_hide g_htc_item {if selId != null && cls.id == selId} g_htc_item_selected{/if}" id="pBlogCls${cls.id}"><em>&#149;</em><a id="editClass${cls.id}" href="#" onclick="${parentName}.openBlogsByClass(\'${cls.id}\', \'${cls.className}\', ${cls.blogCount});return false;">${cls.className|escape}(${cls.blogCount})</a></p>\
      {else}\
      	<p  class="g_t_hide g_htc_item {if selId != null && cls.id == selId} g_htc_item_selected{/if}" ><em>&#149;</em><a id="editClass${cls.id}" href="${hostPath}/editBlogAll.do?p1=cls&p2=\'${cls.id}\'&p3=${cls.blogCount}">${cls.className|escape}(${cls.blogCount})</a></p>\
      {/if}\
      <span class="n_ n6 g_c_hand d" title="ɾ��" onclick="${objectName}.onClassDel(\'${cls.id}\', \'${cls.className|escape}\');">&nbsp;</span>\
		 	  <span class="n_ e7 g_c_hand d" title="�༭" onclick="${objectName}.showClsAddDiv(\'edit\', \'editClass${cls.id}\', -1, -1, \'${cls.id}\');">&nbsp;</span>\
    </div>\
    {/for}\
    {else}\
    	 &nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû�з���\
    {/if}\
');
/**
 * ��־ģ�����鵵�б�
 * @type String
 */
var jst_blog_edit_arch = new String('\
    {if yearArchs != null && yearArchs.length != 0}\
    {for yearArch in yearArchs}\
    	{if (yearArch_index==0 && sel != "arch") || (selId.toString().length >= 4 && (yearArch.year == selId.toString().substring(0,4)))}\
      <div id="divYearArch${yearArch.year}" class="g_htc_toggle g_h_20 g_c_hand g_t_left c05" onclick="${objectName}.showHideArch(\'${yearArch.year}\');"><span class="n_ n0 ck0">&nbsp;</span><span class="n_ n1 ck1">&nbsp;</span>${yearArch.year}��</div>\
    	{else}\
      <div id="divYearArch${yearArch.year}" class="g_htc_toggle g_h_20 g_c_hand g_t_left c05" onclick="${objectName}.showHideArch(\'${yearArch.year}\');"><span class="n_ n0 ck1">&nbsp;</span><span class="n_ n1 ck0">&nbsp;</span>${yearArch.year}��</div>\
    	{/if}\
      <div id="uYearArch${yearArch.year}" class="g_menu_07 c06" {if (!((yearArch_index==0 && sel != "arch") || (selId.toString().length >= 4 && (yearArch.year == selId.toString().substring(0,4)))))} style="display:none;"{/if}>\
        {for monthArch in yearArch.archives}\
        	{if (pageName == "editBlogAll")}\
          	<p class="g_t_hide g_h_18" id="pMonthArch${monthArch.year}_${monthArch.month}">\
          	<a href="#" {if selId != null && selId == monthArch.year + "-" + monthArch.month + "-01"} class="g_htc_item g_htc_item_selected" {else} class="g_htc_item"{/if}  onclick="${parentName}.openBlogsByArchive(\'${monthArch.toStandardStr()}\', \'${monthArch.year}-${monthArch.month}\', ${monthArch.count});return false;">${monthArch.month}��(${monthArch.count})</a></p>\
          {else}\
          	<p class="g_t_hide g_h_18">\
          	<a href="${hostPath}/editBlogAll.do?p1=arch&p2=\'${monthArch.toStandardStr()}\'&p3=${monthArch.count}" \
          		{if selId != null && selId == monthArch.year + "-" + monthArch.month + "-01"} class="g_f_init_select"{/if}>${monthArch.month}��(${monthArch.count})</a></p>\
          {/if}\
        {/for}\
      </div>\
    {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû�д浵\
    {/if}\
');

/**
 * ��־ģ����������б�, ���༭״̬��
 * @type String
 */
var jst_blog_edit_rcntcom = new String('\
    {if comments != null && comments.length != 0}\
      {for com in comments}\
        <div>\
        <p class="g_t_hide g_h_18 c05"><em>'+jst_global_sign+'</em>\
        	{if com.publisherName != ""}<a class="g_p_inline" href="http://${com.publisherName|parentDomain}/" target="_blank">${com.publisherNickname|escape}</a>\
        	{else}${com.publisherNickname|escape}{/if}:\
        </p>\
        <p class="g_t_hide g_h_18 in c07"><a href="${hostPath}/getBlog.do?bid=${com.blogId}">${com.content|substring:0,20|default:""|escape}</a></p>\
		</div>\
      {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû������\
    {/if}\
');    

/**
 * ��־�༭���������ģ��
 * @type String
 */
var jst_blog_edit_com = new String('\
    {for com in coms}\
    <div class="bd1b g_c_mvdn g_c_mvup">\
      <div class="g_h_20">\
        <div class="g_p_left g_c_hpdin g_w_60 g_t_hide g_t_left c06"><label class="c09">������:&nbsp;</label>\
        {if com.publisherName != ""}\
        <a href="http://${com.publisherName|parentDomain}" target="_blank">${com.publisherNickname}</a>\
        {else}\
        ${com.publisherNickname}\
        {/if}\
        </div>\
        <div class="g_p_right g_w_15 g_t_center"><span id="delcom${com.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteComment(\'${com.id}\');return false;" title="ɾ������">&nbsp;</span></div>\
        <div class="g_p_right g_w_20 g_t_center c09">${NetEase.DateTime.formatRecentDate(com.publishTime,"MM��dd�� HH:mm")}</div>\
      </div><div class="g_p_clear g_t_space">&nbsp;</div>\
      <div class="g_t_left g_c_pdin g_w_95 g_t_wrap c07">${com.content}</div>\
    </div>\
    {/for}\
');


var jst_blog_edit_trackback = new String('\
    {for tb in tbs}\
    <div class="bd1b g_c_mvdn g_c_mvup">\
      <div class="g_h_20">\
        <div class="g_p_left g_c_hpdin g_w_60 g_t_hide g_t_left c05"><a href="${tb.referBlogUrl}">${tb.referBlogTitle|default:""}</a></div>\
        <div class="g_p_right g_w_15 g_t_center"><span id="deltb${tb.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteTrackback(\'${tb.id}\');return false;" title="ɾ������">&nbsp;</span></div>\
        <div class="g_p_right g_w_20 g_t_center c09">${NetEase.DateTime.formatRecentDate(tb.referTime,"MM��dd�� HH:mm")}</div>\
      </div>\
      <div class="g_p_clear g_t_space">&nbsp;</div>\
    </div>\
    {/for}\
');


/**
 * ��־Ԥ��ģ���������б�
 * @type String
 */
var jst_blog_prev_class = new String('\
  	{if classes != null && classes.length != 0}\
  	{for cls in classes}\
	   	{if (pageName == "prevBlog")}\
	  	<p class="g_t_hide g_h_18" id="blogClassId${cls.id}"><em>&#149;</em><a href="#" onclick="applySelectCss(\'blogClassId${cls.id}\');${parentName}.openBlogsByClass(\'${cls.id}\', \'${cls.className|escape|js_string}\', ${classBlogCount[cls_index]});return false;">${cls.className|escape}(${classBlogCount[cls_index]})</a></p>\
	  	{else}\
	  	<p class="g_t_hide g_h_18" ><em>&#149;</em><a href="${hostPath}/prevBlog.do?clsId=${cls.id}&class=">${cls.className|escape}(${classBlogCount[cls_index]})</a></p>\
	  	{/if}\
  	{/for}\
  	{else}\
  	&nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû�з���\
  	{/if}\
');

/**
 * ��־Ԥ��ģ�����浵�б�
 * @type String
 */
var jst_blog_prev_arch = new String('\
    {if yearArchs != null && yearArchs.length != 0}\
    {for yearArch in yearArchs}\
    {if yearArch_index==0}\
      <div class="g_h_20 g_c_mvdn g_c_hand g_t_left n_ n1 c06" id="updown${yearArch.year}" onclick="${objName}.show_hide(\'yearArch${yearArch.year}\', \'updown${yearArch.year}\', true);return false;">${yearArch.year}��</div>\
      {else}\
      <div class="g_h_20 g_c_mvdn g_c_hand g_t_left n_ n0 c06" id="updown${yearArch.year}" onclick="${objName}.show_hide(\'yearArch${yearArch.year}\', \'updown${yearArch.year}\', true);return false;">${yearArch.year}��</div>\
      {/if}\
      <div id="yearArch${yearArch.year}" class="g_menu_07 c06" {if yearArch_index > 0}style="display:none;"{/if}>\
        {for monthArch in yearArch.archives}\
        	{if (pageName == "prevBlog")}\
          	<p class="g_t_hide g_h_18" id="monthArch${monthArch.year}_${monthArch.month}"><a href="#" onclick="applySelectCss(\'monthArch${monthArch.year}_${monthArch.month}\');${parentName}.openBlogsByArchive(\'${monthArch.toStandardStr()}\', \'${monthArch.toString()}\', ${monthArch.count});return false;">${monthArch.month}��(${monthArch.count})</a></p>\
          {else}\
          	<p class="g_t_hide g_h_18" id="monthArch${monthArch.year}_${monthArch.month}"><a href="${hostPath}/prevBlog.do?archive=${monthArch.toStandardStr()}">${monthArch.month}��(${monthArch.count})</a></p>\
          {/if}\
        {/for}\
      </div>\
    {/for}\
    {else}\
    	&nbsp;&nbsp;&nbsp;&nbsp;Ŀǰû�д浵\
    {/if}\
');    



var jst_blog_com_editall = new String('\
		{for com in comments}\
			<div id="ul_${blogId}" class="bdt g_c_mvdn">\
			 <div class="g_h_25">\
				 <div class="g_p_left g_c_hpdin g_w_70 g_t_hide g_t_left">\
					 <label class="c09">������:&nbsp;</label>\
					 {if com.publisherName!=null && com.publisherName != ""}<a class="c06" href="http://${com.publisherName|parentDomain}/" target="_blank">${com.publisherNickname|default:""|escape}</a>\
				 	 {else}${com.publisherNickname|default:""|escape}{/if}\
				 </div>\
				 <div class="g_p_right g_w_10 g_t_center"><span id="delcom_${com.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteComment(\'${com.id}\', \'${blogId}\');return false;" title="ɾ������">&nbsp;</span></div>\
				 <div class="g_p_right g_w_15 g_t_center c09">${NetEase.DateTime.formatRecentDate(com.publishTime,"MM��dd�� HH:mm")}</div>\
			 </div><div class="g_p_clear g_t_space">&nbsp;</div>\
			 <div class="g_t_left g_c_pdin g_w_95 g_t_wrap c07">${com.content|default:""}</div>\
		 </div>\
		{/for}\
');

var jst_blog_editall_trackback = new String('\
	{for tbs in trackbacks}\
	<div class="g_c_mvlft" id="ulTrackback_${blogId}">\
		 <div class="g_h_25 bdt">\
			 <div class="g_p_left g_c_hpdin g_w_70 g_t_hide g_t_left c07"><a href="${tbs.referBlogUrl}">${tbs.referBlogTitle|escape}</a></div>\
			 <div class="g_p_right g_w_10 g_t_center"><span id="deltb_${tbs.id}" class="n_ n6 g_c_hand" onclick="${objectName}.deleteTrackback(\'${tbs.id}\', \'${blogId}\');return false;" title="ɾ������">&nbsp;</span></div>\
			 <div class="g_p_right g_w_15 g_t_center c09">${NetEase.DateTime.formatRecentDate(tbs.referTime,"MM��dd�� HH:mm")}</div>\
		 </div><div class="g_p_clear g_t_space">&nbsp;</div>\
	 </div>\
	 {/for}\
');
 
/**
 * Ԥ����־�б�
 * @type String
 */
var jst_blog_prev_list = new String('\
    {if blogs != null && blogs.length > 0}\
    {for b in blogs}\
    {if b_index < blogRange}\
    <div class="g_c_pdin item" id="blog_${b.id}">\
      <div class="g_title_00 g_t_bold g_p_2_height g_c_hand selitm" onclick="${objName}.show_hide_each_blog(\'${b.id}\', \'blogContent_\', \'classArrow_\');" title="�۵�/չ����־����">\
      	<span class="g_t_14 g_t_left g_w_90 g_t_hide c07" id="divBlogTitle${b.id}">${b.title|default:""|escape}</span>\
      	<div class="n_ n2" id="classArrow_${b.id}">&nbsp;</div>\
      </div>\
      <div id="blogContent_${b.id}" style="display:none;">\
	      <div class="g_title_00 g_c_pdin">\
	        <span class="g_t_left g_w_80 g_t_hide c08">\
	          {if b.className != null && b.className != ""}\
	             <label>����:&nbsp;</label>\
	             <a id="aBelongCls${b.id}" class="c06" href="#" onclick="${objName}.openSameClass(\'${b.classId}\', \'${b.className|escape|js_string}\');">${b.className|escape}</a>\
	          {/if}\
	          {if b.className != null && b.className != "" && b.tag != null && b.tag != ""}<nobr class="bd1c">&nbsp;|&nbsp;</nobr>{/if}\
	          {if b.tag != null && b.tag != ""}\
	             <label>��ǩ:&nbsp;</label>\
	             {for t in b.tagArray}{if t_index != 0}&nbsp;{/if}<a class="c06" href="#" onclick="${objName}.searchTagObj(\'${t|escape|js_string}\', false);return false;">${t|escape}</a>{if t_index < b.tagArray.length - 1},{/if}{/for}\
	          {/if}\
	        </span>\
	        <div class="c08">�ֺ�&nbsp;[\
	          <a id="aFontLarge${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 1);return false;">��</a>&nbsp;\
	          <a id="aFontMedium${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 2);return false;">��</a>&nbsp;\
	          <a id="aFontSmall${b.id}" class="c06" href="#" onclick="changeFont(\'blogtext_${b.id}\', 3);return false;">С</a>]\
	        </div>\
	      </div>\
	      <div class="g_c_pdin g_t_left c07 content" id="blogtext_${b.id}"></div>\
	      <div class="g_t_center"><div id="relateBlogCircle_${b.id}" class="g_t_left g_p_center" style="width:95%;"></div></div>\
      </div>\
      <div class="g_tab_btn00 g_t_left g_c_mvdn g_h_18" id="cssTabBar_${b.id}">\
        <div class="c08">${b.accessCount}���Ķ�</div>\
        <div class="bd1l bd1r" id="openPermaDiv${b.id}"><a id="aOpenPerma${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openPermaDiv${b.id}\');${objName}.openPermalink(\'${b.id}\', \'${b.permalink}\');return false;">�̶�����<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="bd1l bd1r"><a id="share${b.id}" class="c05" href="#" onclick="${objName}.showShareDiv(\'${b.id}\', \'${b.permalink}\');return false;">����</a></div>\
        <div class="bd1l bd1r" id="openTbDiv${b.id}"><a id="aOpenTb${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openTbDiv${b.id}\');${objName}.openTrackbacks(\'${b.id}\', \'${b.trackbackUrl}\');return false;">���� (${b.trackbackCount})<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="bd1l bd1r" id="openComDiv${b.id}"><a id="aOpenCom${b.id}" class="c05" href="#" onclick="${objName}.upDownCssTabBar(\'${b.id}\',\'openComDiv${b.id}\');${objName}.openComments(\'${b.id}\', ${b.commentCount}, \'${b.title|escape|js_string}\', \'${b.permalink}\');return false;">���� (<nobr id="comCount_${b.id}">${b.commentCount}</nobr>)<span class="n_ n32 g_p_none">&nbsp;</span></a></div>\
        <div class="c09">��${NetEase.DateTime.formatDate(b.publishTime,"YYYY-MM-dd HH:mm")}</div>\
        <input id="openPerma_${b.id}" type="hidden" value="0"/><!--0��ʾ�رգ�1��ʾ��-->\
	    <input id="openCom_${b.id}" type="hidden" value="2"/><!--0��ʾ�رգ�1��ʾ�򿪣�2��ʾ����δ����-->\
	    <input id="openTrack_${b.id}" type="hidden" value="2"/><!--0��ʾ�رգ�1��ʾ�򿪣�2��ʾ����δ����-->\
      </div><div class="g_p_clear g_t_space">&nbsp;</div>\
	  <div class="g_t_left" id="perma_${b.id}" style="display:none;">\
	    <div class="g_h_20 g_c_mvdn"><span id="aClosePerma${b.id}" class="g_p_right g_c_hand n_ n7" onclick="${objName}.closeCssTabBarAll(\'${b.id}\');${objName}.closePermalink(\'${b.id}\');return false;" title="�ر�">&nbsp;</span></div>\
		<div class="g_c_pdin">\
		  <div class="c08">���ĵĹ̶���������:&nbsp;&nbsp;<span id="permCopyFinished_${b.id}" class="n_ f17" style="display:none;">�����������ӳɹ�</span></div>\
		  <div>\
		    <a id="aPerma${b.id}" class="c06" href="http://${hostName|parentDomain}/${b.permalink}" target="_blank">http://${hostName|parentDomain}/${b.permalink}</a>&nbsp;\
			<a id="copyPerma${b.id}" class="g_c_button bd01 butn c05" onclick="clickTBUrl(\'aPerma${b.id}\', \'permCopyFinished_${b.id}\')" title="������������">������</a>\
		  </div>\
		</div>\
	  </div>\
      <div id="com_${b.id}" class="g_p_relative g_h_1" style="display:none;">\
	     <div id="comShow_${b.id}"></div>\
	  	 <div id="comPub_${b.id}" class="g_h_1"></div>\
	  </div>\
	  <div id="track_${b.id}" class="g_t_left" style="display:none;"></div>\
    </div>\
    {/if}\
    {/for}\
    {else}\
      <div class="g_c_pdin">\
	     {if loadType == "class"}\
	      	 �÷���������־��\
	     {elseif loadType == "archive"}\
	      	 �ù鵵������־��\
	     {else}\
			 ������־��\
	     {/if}\
	  </div>\
    {/if}\
');    

/**
 * 
 */
var jst_blog_edit_list = new String('\
		{if blogs != null && blogs.length > 0}\
    <div class="g_c_container">\
      <table border="0" cellspacing="0" cellpadding="0">\
        <tr class="c09"><td class="g_w_60 g_t_left c09">����</td><td class="g_w_15 g_t_left c09">���</td><td class="g_w_15 c09 g_t_center">����ʱ��</td><td class="g_w_10 c09 g_t_center">ɾ��</td></tr>\
        {for b in blogs}\
        <tr class="g_htc_selitm">\
          <td class="g_t_left g_t_hide c05"><a href="${hostPath}/blog/getBlog.do?bid=${b.id}">${b.title|escape}</a></td>\
          <td class="g_t_left g_t_hide c08">{if b.className != null && b.className != ""}${b.className|escape}{/if}</td>\
          <td class="g_t_center c09">${NetEase.DateTime.formatRecentDate(b.publishTime,"YYYY�� MM��dd�� HH:mm")}\
      			{if (b.isPublished == 0 && (b.valid == 0 || b.valid == 4))}<br/><b>�ݸ�</b>\
      			{elseif (b.isPublished == 1 && b.valid == 16)}<br/><b>δ�������д�ϵͳ�����</b>\
      			{elseif (b.isPublished == 1 && b.valid == 24)}<br/><b>δ�������д�ϵͳ�����</b>\
      			{elseif (b.isPublished == 1 && b.valid == 25)}<br/><b>��˲�ͨ��</b>\
      			{elseif (b.valid == 26)}<br/><b>�ѱ����Σ����������Ķ�</b>\
      			{/if}</td>\
          <td class="g_t_center"><span id="delblog_${b.id}" class="g_c_hand n_ n6" title="ɾ��blog" onClick="${objectName}.deleteBlog(\'${b.id}\', ${b.isPublished}, ${b.valid}, ${b.publishTime}, ${b.allowView}, \'${b.classId}\');return false;">&nbsp;</span></td>\
        </tr>\
        {if ((b.isPublished == 1) && (b.commentCount > 0 || b.trackbackCount > 0))}\
        <tr>\
        	<td colspan="4" class="g_t_left g_c_lmvlft">\
        	{if b.commentCount > 0}\
        	<input id="open_${b.id}" type="hidden" value="0"/>\
        	<div id="blogshowcomment_${b.id}">\
							<div><a class="g_p_left g_htc_toggle" href="javascript:;" onclick="${objectName}.switchComments(\'${b.id}\', ${b.commentCount});return false;">\
								<span id="imgCom${b.id}"><span class="ck0 n_ n4">&nbsp;</span><span class="ck1 n_ n5">&nbsp;</span></span>����:<nobr id="comCount_${b.id}">${b.commentCount}</nobr>&nbsp;&nbsp;</a>\
								<div id="comPageNav_${b.id}" class="g_p_left g_w_30"></div>\
								<div class="g_p_clear g_t_space">&nbsp;</div>\
							</div>\
							<div class="g_c_mvlft" id="_$_com_editall_${b.id}" style="display:none;"></div>\
					</div>\
        	{/if}\
        	{if b.trackbackCount > 0}\
	        	<div>\
					<div id="tbsdiv_${b.id}">\
						<a class="g_htc_toggle" href="javascript:;" onclick="${objectName}.switchTrackback(\'${b.id}\');return false;">\
							<span id="imgTb${b.id}"><span class="ck0 n_ n4">&nbsp;</span><span class="ck1 n_ n5">&nbsp;</span></span>����:<nobr id="tbCount_${b.id}">${b.trackbackCount}</nobr></a>\
						<input id="open2_${b.id}" type="hidden" value="0"/>\
						<div class="g_c_mvlft" id="_$_tb_editall_${b.id}" style="display:none;"></div>\
					</div>\
				</div>\
        	{/if}\
        	</td>\
        </tr>\
        {/if}\
        {/for}\
      </table>\
    </div>\
    {else}\
    <div class="g_c_container">\
	  		{if loadType == "class"}\
	      		û�и÷������־��\
	      {elseif loadType == "archive"}\
      			û�иù鵵��������־��\
	      {else}\
	      		������־���ɵ��"�����־"�������־���ݡ�\
	      {/if}\
  	</div>\
    {/if}\
');

/**
 * Ԥ��ҳ������ͨ��
 */
var jst_blog_prev_track = new String('\
	<div class="g_h_20 g_c_mvdn"><span class="g_p_right g_c_hand n_ n7" id="aCloseTb${blogId}" onclick="${objName}.closeCssTabBarAll(\'${blogId}\');${objName}.closeTrackbacks(\'${blogId}\');return false;">&nbsp;</span></div>\
		<div class="g_c_pdin">\
			<div class="c08">�������õ�ַ:&nbsp;&nbsp;<span id="copyFinished_${blogId}" style="display:none" class="n_ f17">�����������ӳɹ�</span></div>\
			<div>\
				<a id="tb_${blogId}" class="c06"><span>http://${hostName|parentDomain}/${tbUrl}</span></a>&nbsp;\
				<a id="imgCopyPerma${blogId}" class="g_c_button bd01 butn c05" title="������������" onclick="clickTBUrl(\'tb_${blogId}\', \'copyFinished_${blogId}\')" >������</a>&nbsp;\
				<a id="imgRefer${blogId}"  class="g_c_button bd01 butn c05" title="������ƪ��־" {if visitorName!=null && visitorName != ""}onclick="window.open(\'http://${visitorName|parentDomain}/blog/getBlog.do?bid=${blogId}&r=1&host=${visitorName}&uid=${hostId}\');"{else}onclick="showLoginDlg(\'\');return false;" {/if}>������</a>\
			</div>\
		</div>\
		{if tbs != null && tbs.length != 0}\
			<div class="g_menu_06 c09">\
			<p class="g_h_20 g_t_left c08">���ü�¼:</p>\
			{for tb in tbs}\
			  <div>\
				<p class="g_t_hide g_h_18 c05"><em>&#149;</em><a class="c05" href="${tb.referBlogUrl}" target="_blank">${tb.referBlogTitle|default:""|escape}</a>\
				(<label class="c09">������:&nbsp;</label>&nbsp;<a class="c06" href="${tb.referHomePage|default:""|escape}" target="_blank">${tb.referBloggerName|default:""|escape}</a>)</p>\
			  </div>\
			{/for}\
			</ul>\
		{/if}\
');

var jst_blog_prev_related_circle = new String('\
    {if relateCircles.length != 0}\
    <div style="margin:50px 0px;">\
	    <div class="blogCircleHint c08">���Ȧ���Ƽ�</div><div class="blogCircleDash bd1c"></div><div style="clear: both;"></div>\
	    <table class="relateCircleBody">\
	    	{for circleBlogs in relateCircles}\
	    		{if circleBlogs.length>=1}\
	    		<tr style="vertical-align:middle">\
		    		<td style="width:5px;height:20px;margin:0px;padding:0px" class="c06">&#149;</td>\
		    		<td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyLeft"><a class="c06" href="${circleBaseUrl}/${circleBlogs[0].circle.urlName}" target="_blank">${circleBlogs[0].circle.name|escape}</a></td>\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight"><a class="c05" href="${CircleInfo.getCircleBlogLink(circleBlogs[0].circle.urlName, circleBlogs[0].blogUserName, circleBlogs[0].permalink)}" target="_blank">${circleBlogs[0].blogTitle|escape}</a></td>\
				    {if circleBlogs.length>=2}\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight"><a class="c05" href="${CircleInfo.getCircleBlogLink(circleBlogs[1].circle.urlName, circleBlogs[1].blogUserName, circleBlogs[1].permalink)}" target="_blank">${circleBlogs[1].blogTitle|escape}</a></td>\
				    {else}\
				    <td style="height:20px;margin:0px;padding:0px 10px" class="relateCircleBodyRight">&nbsp;<td>\
				    {/if}\
			    </tr>\
	    		{/if}\
	    	{/for}\
	    </table>\
    </div>\
    {/if}\
');
/**************************************************************
*		163 blog preview page left navigation column    	  *
*                                                             *
* Written by:  zhujingbo &&  zhuyiwen                         *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2007-01-04									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/


/** 
 * @fileoverview 
 * ��־���ҳ�����ർ����
 * 
 * @author  zhujingbo (zhujingbo@corp.netease.com) &&  zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 2.0 
 * @requires  utils.js
 * @requires  prototype.js
 * @see		  
 */

if (NEBlog==undefined){
	var NEBlog={};
}

/**
 * NEBlog.PrevBlogLeft Class
 *
 * @class ��־�༭ҳ�����ർ��������
 */
NEBlog.PrevBlogLeft = Class.create();




/**
 * ȫ�ֱ���, TrimPathģ��parse��Ķ���
 * ������ʾ"����"��Ŀ
 * @type	Object
 */
NEBlog.PrevBlogLeft.classesTemplate = null;
/**
 * ȫ�ֱ���, TrimPathģ��parse��Ķ���
 * ������ʾ"�浵"��Ŀ
 * @type	Object
 */
NEBlog.PrevBlogLeft.archivesTemplate = null;
/**
 * ��̬����
 * ��ʾ��"��������"������
 * @typpe 	Number
 */
NEBlog.PrevBlogLeft.RECENT_NUMBER = 5;

/**
 * @class	NEBlog.PrevBlogLeft.YearArchive
 * 			"�浵"�������
 * @constructor	
 * @param	{Number}	iYear	��
 * @return	{Void}
 */
NEBlog.PrevBlogLeft.YearArchive =  function(iYear) {
	this.year = iYear;
	this.archives = [];	
}
/**
 * @class	NEBlog.PrevBlogLeft.MonthArchive
 * 			"�浵"���¶���
 * @constructor	
 * @param	{Number}	iYear	��
 * @param	{Number}	iMonth	��
 * @param	{Number}	iCount	�浵����
 * @return	{Void}
 */
NEBlog.PrevBlogLeft.MonthArchive = function(iYear, iMonth, iCount) {
	this.year = iYear;
	this.month = iMonth;
	this.count = iCount;
	this.toStandardStr = function() {
		return this.year + '-' + this.month + '-' + '01';
	}
	this.toString = function() { 
		return this.year + '��' + this.month + '��';
	}
}



NEBlog.PrevBlogLeft.prototype = {
	/**
	 * EditBlogLeft�๹�캯�� ��ʼ��EditBlogLeft����Ԥ�����
	 * @constructor
	 * @param 	{String}	sObjectName  	EditBlogLeftʵ����������	
	 * @return 	{NEBlog.PrevBlogLeft} 		EditBlogLeft����
	 * @see 	#_init
	 */
	initialize: function(sObjectName, sParentName, sPageName){
		/**
		 * ��ʼ������ѡ��
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({
			sTestOn				:	'off',		// ���Կ���on����off	
			sStyle  			:	null,		// ��־����ʽ��ַǰ׺
			sHostName			:   '',			// ��������ͨ��֤����
			iHostId				:   null,		// ������id
			sHostPath			:	null, 		// hostPath��ַ
			sServerName			: 	'',			// server����
			sListType			: 	'',			// blog��ʾ��ʽ, ����/�浵/none...
			iVisitorRank		:   -100,		// ��������ݵȼ���-100:������0:��½�û���100:���ѣ�10000:����
			sYearPara			:   '',			// Archive��ʾģʽ�����css������ʾ����
			sMonthPara			:   ''			// Archive��ʾģʽ���µ�css������ʾ����
		}, arguments[3]||{});
		/**
		 * ����ʵ������
		 * @private
		 * @type	String
		 */
		this._sObjectName = sObjectName;
		/**
		 * ���øĶ���ĸ����������
		 * @private
		 * @type	String
		 */
		this._sParentName = sParentName
		/**
		 * �Ҳ�ҳ������, ��2��: editBlogAll��editBlog
		 * @private
		 * @type	String
		 */
		this._sPageName = sPageName; 
		/**
		 * ��Ϊblinddown����ʱ,��Ҫ������ͬ��״̬
		 * @private
		 * @type	Boolean
		 */
		this._bShowHiding = false;
		/**
		 * ���������
		 * @private
		 * @type	Objects
		 */
		this._oTester4EBL = null;
		/**
		 * �Ƿ����ɹ�"�鵵"ģ�������
		 * @private
		 * @type	Boolean
		 */
		this._bHasArchive = false;
		/**
		 * �Ƿ����ɹ�"��������"ģ�������
		 * @private
		 * @type	Boolean
		 */
		this._bHasRecentComments = false;
		/**
		 * ������������, ��prevBlog.jsʹ��
		 * @type	Array
		 */
		this.recentComments;
		
		this._init();
		
		return this;
	},
	
	/**
	 * ��ʼ������
	 * @private
	 * @return	{Void}
	 */
	_init: function() {
		if(NEBlog.PrevBlogLeft.classesTemplate == null)
			NEBlog.PrevBlogLeft.classesTemplate = createJSTAndParse("jst_blog_prev_class", jst_blog_prev_class);	
		if(NEBlog.PrevBlogLeft.archivesTemplate == null)
			NEBlog.PrevBlogLeft.archivesTemplate = createJSTAndParse("jst_blog_prev_arch", jst_blog_prev_arch);	
		if (this._oOptions.sTestOn == 'on')
			this._oTester4EBL = new NECtrl.SeleniumTester();
	},
	/**
	 * ��ʾ��־"����"ģ��
	 * @param	{Array}		oClasses			��������б�
	 * @param	{String}	sElemId				��ʾ����ģ���div��id
	 * @param	{Number}	iTotalBlogCount		blog��������
	 * @param	{Number}	iVisitorRank		�����ߵĵȼ���-100:������0:��½�û���100:���ѣ�10000:����
	 * @param	{String}	sListType			��־��ʾ����, ��class��ʾ,����archive��
	 * @param	{Number}	iEncodeClassId		class��ʾʱ��Ӧ����ʽ�ı��
	 * @return	{Void}		
	 * @see		#_test4EBL
	 * @see		#applySelectCss
	 * @see		Trimpath
	 */
	showBlogClasses: function (oClasses, sElemId, iTotalBlogCount, iVisitorRank, sListType, iEncodeClassId) {
		// ��־���ҳ����Ҫ��Բ����ķ���Ȩ��,�����÷�����־������
		var _oBlogCount = new Array(); 
		for (var i = 0; i < oClasses.length; i++) {
			if (iVisitorRank >= 10000)
				_oBlogCount[i] = oClasses[i].publishedBlogCount;
			else if (iVisitorRank >= 100)
				_oBlogCount[i] = oClasses[i].publicBlogCount + oClasses[i].friendBlogCount;
			else if (iVisitorRank >= -100)
				_oBlogCount[i] = oClasses[i].publicBlogCount;
		}
		var _oData = {classes: oClasses, totalBlogCount: iTotalBlogCount, classBlogCount: _oBlogCount, 
					  hostName: this._oOptions.sHostName, pageName: this._sPageName, 
					  hostPath: this._oOptions.sHostPath, parentName: this._sParentName};
		var _sResult = NEBlog.PrevBlogLeft.classesTemplate.process(_oData);
		$(sElemId).innerHTML = _sResult;	
		if (sListType == 'class') {
			applySelectCss("blogClassId"+iEncodeClassId);
		} else if (sListType == 'archive') {
			//do nothing
		} else {
				applySelectCss("blogAll");		
		}
		
		if (this._oTester4EBL) {
			if (oClasses == null || oClasses.length == 0) {
				this._test4PBL("LClass", "null");
			} else {
				var _aClsId = oClasses.pluck("id");
				this._test4PBL("LClass", _aClsId);
			}
		}	
	},
	/**
	 * ��ʾ"�浵"ģ��
	 * @param	{Array}		oArchives		"�浵"�����б�
	 * @param	{String}	sElemId			��ʾ�����div��Ӧ��id
	 * @param	{Number}	iVisitorRank	�����ߵĵȼ���-100:������0:��½�û���100:���ѣ�10000:����
	 * @param	{String}	sListType		��־��ʾ����, ��class��ʾ,����archive��
	 * @private	{String}	sYearPara		���css������ʾ����
	 * @private	{String}	sMonthPara		�µ�css������ʾ����
	 * @return	{Void}
	 * @see		NEBlog.PrevBlogLeft.MonthArchive
	 * @see		NEBlog.PrevBlogLeft.YearArchive
	 * @see		#_test4EBL
	 * @see		Trimpath
	 */
	showArchives: function(oArchives, sElemId, iVisitorRank, sListType,sYearPara,sMonthPara) {
		var _oYearArchs = [];
		var _iYearIndex = -1;	
		var _iArchiveCount = oArchives.length;
		for (var i = 0; i < _iArchiveCount; i++) {
			var _oDate = new Date(oArchives[i].archiveDate);
			var _iYear = _oDate.getFullYear();
			var _iMonth  = parseInt(_oDate.getMonth()) + 1;
			var _iCount = 0;
			if (iVisitorRank >= 10000) {
				_iCount = oArchives[i].publishedBlogCount;
			}
			else if (iVisitorRank >= 100)
				_iCount = oArchives[i].publicBlogCount + oArchives[i].friendBlogCount;
			else if (iVisitorRank >= -100)
				_iCount = oArchives[i].publicBlogCount;
			if (_iCount == 0)
				continue;
			if (_iYearIndex >= 0 && _oYearArchs[_iYearIndex].year == _iYear) { //�Ѿ������������
				//����һ���¶���
				var _oMonthArch = new NEBlog.PrevBlogLeft.MonthArchive(_iYear, _iMonth, _iCount);
				_oYearArchs[_iYearIndex].archives.push(_oMonthArch);
			} else {
				//����һ�������
				var _oYearArch = new NEBlog.PrevBlogLeft.YearArchive(_iYear);  
				//����һ���¶���
				var _oMonthArch = new NEBlog.PrevBlogLeft.MonthArchive(_iYear, _iMonth, _iCount); 
				_oYearArch.archives.push(_oMonthArch);
				//������������������
				_oYearArchs.push(_oYearArch);
				_iYearIndex++;
			}
		}
		var _oData = {yearArchs: _oYearArchs, pageName: this._sPageName, hostPath: this._oOptions.sHostPath, 
					  objName: this._sObjectName, style: this._oOptions.sStyle, parentName:this._sParentName};

		var _sRresult = NEBlog.PrevBlogLeft.archivesTemplate.process(_oData); 
		$(sElemId).innerHTML = _sRresult;
		if (sListType == 'class') {
		} else if (sListType == 'archive') {
			applySelectCss("monthArch"+sYearPara+"_"+sMonthPara);		
			this.show_hide("yearArch"+sYearPara, "updown"+sYearPara, "icn_up.gif", "icn_down.gif");
		} else {
			applySelectCss("blogAll");		
		}
		
		if (this._oTester4EBL) {
			if (oArchives == null || oArchives.length == 0) {
				this._test4PBL("LArch", "null");
			} else {
				var _aArchId = oArchives.pluck("id");
				this._test4PBL("LArch", _aArchId);
			}
		}	
	},
	
	/**
	 * �򿪹ر������������Ŀ
	 * @param	{String}	sShowId		���Ķ�Ӧ��div��id
	 * @param	{String}	sArrowId	�򿪹ر����ĵļ�ͷid
	 * @param	{String}	sUpImg		�򿪵ļ�ͷͼƬ
	 * @param	{String}	sDownImg	�رյļ�ͷͼƬ
	 * @return	{Void}
	 * @see		Effect#BlindDown
	 * @see		Effect#Up
	 * @see		#showArchives
	 * @see		#showRecentComments
	 */
	show_hide: function(sShowId, sArrowId, vIsyear){
		if (this._bShowHiding == true)
			return;
		var _oShowDiv = $(sShowId);		
		if(_oShowDiv.style.display=="none") {
			/*����ش浵*/
			if(sShowId == "_$_blog_prev_arch" && !this._bHasArchive) {
				this._bHasArchive = true;
					//��ȡ�鵵
				BlogBean.getRecentArchives(this._oOptions.iHostId, {
					callback:function(oDataFromServer) {
						this.showArchives(oDataFromServer, "_$_blog_prev_arch" , this._oOptions.iVisitorRank, 
										  this._oOptions.sListType, this._oOptions.sYearPara, this._oOptions.sMonthPara);
					}.bind(this)
				});	
			}
			if (sArrowId != null)
				if(true==vIsyear) {
					Element.removeClassName(sArrowId,"n0");
	  				Element.addClassName(sArrowId,"n1");
				}else{
					Element.removeClassName(sArrowId,"n2");
	  				Element.addClassName(sArrowId,"n3");
				}
			this._bShowHiding = true;
			Effect.BlindDown(sShowId,{duration:0.1, 
				userCallBack: function(){
					this._bShowHiding = false;
				}.bind(this)
			});
		}else {
	  		if (sArrowId != null)
	  			if(true==vIsyear){
	  				Element.removeClassName(sArrowId,"n1");
	  				Element.addClassName(sArrowId,"n0");
	  			}else{
	  				Element.removeClassName(sArrowId,"n3");
	  				Element.addClassName(sArrowId,"n2");
	  			}
			this._bShowHiding = true;
	  		Effect.BlindUp(sShowId,{duration:0.1, 
	  			userCallBack: function(){
	  				this._bShowHiding = false;
	  			}.bind(this)
	  		});
	  	}
	},
	/**
	 * ����
	 * @private
	 * @param	{String}	sKey		���Զ���ļ�
	 * @param	{String}	vValues		���Զ����ֵ
	 * @param	{String}	sRelValue	...
	 * @return	{Void}	
	 */
	_test4PBL: function(sKey, vValues, sRelValue) {
		if (!this._oTester4EBL)
			return;
		switch (sKey) {
			case "LClass":
				this._oTester4EBL.setArray("LClass", vValues);
				break;
			case "LArch":
				this._oTester4EBL.setArray("LArch", vValues);
				break;
			case "LRcntCom":
				this._oTester4EBL.setArray("LRcntCom", vValues);
				break;
		}	
	}
}

var recentNumber = 5;
var serverName;
var gRecentComments;
var gStatusElemId;
function clickTBUrl(urlElemId, statusElemId) {
	if(copyText(urlElemId)){
		document.getElementById(statusElemId).style.display='inline';
		gStatusElemId = statusElemId;
		window.setTimeout(fadeStatus, 5000);
	}
}

function fadeStatus() {
	document.getElementById(gStatusElemId).style.display='none';
}

/*************************************************�ֺ�*************************************************/
function changeFont(sElemId, size) {
	if (size == 1) {
		if(Element.hasClassName(sElemId, "g_t_midle"))
			Element.removeClassName(sElemId, "g_t_midle");
		Element.addClassName(sElemId, "g_t_large");
	}else if (size == 2) {
		if(Element.hasClassName(sElemId, "g_t_large"))
			Element.removeClassName(sElemId, "g_t_large");
		Element.addClassName(sElemId, "g_t_midle");
	}else if (size == 3) {
		if(Element.hasClassName(sElemId, "g_t_midle"))
			Element.removeClassName(sElemId, "g_t_midle");
		if(Element.hasClassName(sElemId, "g_t_large"))
			Element.removeClassName(sElemId, "g_t_large");
	}
}
/**************************************************************
*				163 blog preview page 						  *
*                                                             *
* Written by:  zhujingbo &&  zhuyiwen                         *
* Important: to use this script don't                         *
*            remove these comments                            *
* Version 2.0 (MSIE 6.0 above,Firefox1.0,Netscape.)           *
* Created Date: 2007-01-04									  *
* Copyright��1997-2006 NetEase.com Inc. All rights reserved.  *
**************************************************************/

/** 
 * @fileoverview 
 * ��־Ԥ��(���)ҳ��
 * 
 * @author  zhujingbo (zhujingbo@corp.netease.com) &&  zhuyiwen@(zhuyiwen@corp.netease.com)
 * @version 2.0 
 * @requires  utils.js
 * @requires  prototype.js
 * @requires  prevBlogComm.js
 * @see		  
 */
 
if (NEBlog==undefined){
	var NEBlog={};
}


/**
 * ȫ�ֱ���, PrevBlog����ʵ��, ����ftlҳ�����
 * @type	NEBlog.PrevBlog
 */
NEBlog.gPrevBlog = null;


function gLoadPrevBlog(sPageName, sStyle, sHostName, iHostId,
		sHostPath,sServerName,sListType	,iBlogRange ,iCommentRange, iTotalBlogCount, sCircleBaseUrl,
		iVisitorId,sVisitorName, sVisitorNickname,sVisitorAvatar, iVisitorRank, sVisitorIP,	
		iGlobalAllowComment, iVisibleBlogCount, sParamClsId	,sEncodeClassId, sParamClsName, 
		sParamArchDate, sClsElemId, sTestOn)
{
	NEBlog.gPrevBlog = new NEBlog.PrevBlog('NEBlog.gPrevBlog', sPageName, {
		sTestOn:sTestOn, sStyle:sStyle, sHostName:sHostName, iHostId:iHostId,
		sHostPath:sHostPath, sServerName:sServerName, sListType:sListType,
		iBlogRange:iBlogRange,iCommentRange:iCommentRange, iTotalBlogCount:iTotalBlogCount, 
		sCircleBaseUrl:sCircleBaseUrl, iVisitorId:iVisitorId, sVisitorName:sVisitorName, 
		sVisitorNickname:sVisitorNickname, sVisitorAvatar:sVisitorAvatar, iVisitorRank:iVisitorRank, 
		sVisitorIP:sVisitorIP, iGlobalAllowComment:iGlobalAllowComment, 
		iVisibleBlogCount:iVisibleBlogCount, sParamClsId:sParamClsId, sEncodeClassId:sEncodeClassId, 
		sParamClsName:sParamClsName, sParamArchDate:sParamArchDate,
		sClsElemId:sClsElemId});

}




/**
 * NEBlog.PrevBlog Class
 *
 * @class ��־Ԥ��(���)ҳ�����
 */
NEBlog.PrevBlog = Class.create();



/**
 * ȫ�ֱ���, TrimPathģ��parse��Ķ���
 * ������ʾ��־
 * @type	Object
 */
NEBlog.PrevBlog.blogsTemplate = null;
/**
 * ȫ�ֱ���, TrimPathģ��parse��Ķ���
 * ������ʾ��־������ͨ��
 * @type	Object
 */
NEBlog.PrevBlog.trackbacksTemplate = null;
/**
 * ȫ�ֱ���, TrimPathģ��parse��Ķ���
 * ������ʾ�Ƽ����ͺ�Ȧ��
 * @type	Object
 */
NEBlog.PrevBlog.relateBlogCircleTemplate = null;
/**
 * ��̬����, ���۵��������
 * @type	Number
 */
NEBlog.PrevBlog.COMMENT_MAX_LENTH = 1000;



NEBlog.PrevBlog.prototype = {
	/**
	 * PrevBlog�๹�캯�� ��ʼ��PrevBlog����Ԥ�����
	 * @constructor
	 * @param 	{String}	sObjectName  	EditBlogLeftʵ����������	
	 * @return 	{NEBlog.PrevBlogLeft} 		EditBlogLeft����
	 * @see 	#_init
	 */
	initialize: function(sObjectName, sPageName){
		/**
		 * ��ʼ������ѡ��
		 * @private
		 * @type	Object
		 */
		this._oOptions = Object.extend({
			sTestOn				:	'off',		// ���Կ���on����off	
			sStyle  			:	null,		// ��־����ʽ��ַǰ׺
			sHostName			:   null,		// ��������ͨ��֤����
			iHostId				:   null,		// ������id
			sHostPath			:	null, 		// hostPath��ַ
			sServerName			: 	null,		// server����
			sListType			: 	null,		// blog��ʾ��ʽ, class/archive/none
						                 
			iBlogRange   		:   10,			// ÿҳ��ʾ����־����           
			iCommentRange		:	10,         // ÿƪ��־��ʾ��������         
			iTotalBlogCount		:	0,			// �ܵ���־����                                              
			sCircleBaseUrl		:	'',         // Ȧ����ҳurl��ַ   
            
            iVisitorId			:	null,		// ������id   
			sVisitorName		:	null,     	// �����ߵ��û���                         
			sVisitorNickname	:	null,       // �����ߵ��ǳ�   
			sVisitorAvatar		:	null,       // ͷ�����ӵ�ַ     
            iVisitorRank		:   null,		// ��������ݵȼ���-100:������0:��½�û���100:���ѣ�10000:����
			sVisitorIP			:	null,       // ������           
			iGlobalAllowComment	:	null, 		// �Ƿ�ö����������ۣ��û����õ����۷���Ȩ�ޣ���
			
			iVisibleBlogCount	:	null,        
			sParamClsId			:	null,
			sEncodeClassId		:	null,
			sParamClsName		:	null, 
			sParamArchDate		: 	null,
			sClsElemId			:	null	
		}, arguments[2]||{});
		
		/**
		 * ����ʵ������
		 * @private
		 * @type	String
		 */
		this._sObjectName = sObjectName;
		/**
		 * �Ҳ�ҳ������, ��2��: editBlogAll��editBlog
		 * @private
		 * @type	String
		 */
		this._sPageName = sPageName; 
		/**
		 * ��Ϊblinddown����ʱ,��Ҫ������ͬ��״̬
		 * @private
		 * @type	Boolean
		 */
		this._bShowHiding = false;
		/**
		 * ���������
		 * @private
		 * @type	Objects
		 */
		this._oTester4PB = null;		
		/**
		 * ��Ϊblinddown����ʱ,��Ҫ�����ĸ�blinddown���ڵĴ򿪹ر�ͬ������
		 * blinddown��ʾ��һ������������Ǹ����Ӷ�Ӧ�Ĵ���
		 * _iGid���ڿ����ĸ����ڵĴ򿪹ر�ͬ������
		 * @private
		 * @type	Number
		 */
		this._iGid ;
		/**
		 * ���۶���ʵ������
		 * @type	Array
		 */
		this.commentPublishes = {};
		/**
		 * ��־��ǰҳ����
		 * @private
		 * @type	Object
		 */
		this._oBlogPager = null;
		/**
		 * �������Archive��ʾģʽ�����css������ʾ����
		 * @private
		 * @type	String
		 */
		this._sYearPara = null;	
		/**
		 * Archive��ʾģʽ���µ�css������ʾ����
		 * @private
		 * @type	String
		 */
		this._sMonthPara = null; 	
		/**
		 * ��־�������
		 * @private
		 * @type	Array
		 */
		this._oBlogClasses = null;
		/**
		 * ��ǰ�򿪵���־id
		 * @private
		 * @type	Number
		 */
		this._iOpenBlogId = null;
		/**
		 * ����Ƽ�Ȧ��, blogId-->div����
		 * @private
		 * @type	Array
		 */
		this._oRelateBlogCircleMap = {};
		/**
		 * ���������, ������ʾ����, �浵, ������־
		 * @type	Object
		 */
		this.prevBlogLeft = null;	
		/**
		 * ÿƪ��־���²���������չ���͹ر�״̬
		 * ��Map��Ŵ򿪺͹ر�״̬
		 * key: ��־��BlogId
		 * value: ����־�򿪵Ĺ�������Ӧ��Div��id
		 * @type 	Array
		 */
		this._oCssTabBarUpdownStatus = {};
		
		this._init();
		
		return this;
	},
	/**
	 * ��ʼ������
	 * @private
	 * @return	{Void}
	 * @see		NECtrl.SeleniumTester
	 */
	 _init: function() {
	 	if (this._oOptions.sTestOn == 'on')
			this._oTester4PB = new NECtrl.SeleniumTester();
		if(NEBlog.PrevBlog.blogsTemplate == null)
			NEBlog.PrevBlog.blogsTemplate = createJSTAndParse("jst_blog_prev_list", jst_blog_prev_list);	
		if(NEBlog.PrevBlog.trackbacksTemplate == null)
			NEBlog.PrevBlog.trackbacksTemplate = createJSTAndParse("jst_blog_prev_track", jst_blog_prev_track);
		if(NEBlog.PrevBlog.relateBlogCircleTemplate == null)
			NEBlog.PrevBlog.relateBlogCircleTemplate = createJSTAndParse("relateBlogCircle_jst", jst_blog_prev_related_circle);	
		if (this._oOptions.sListType == 'class') {
			this.openBlogsByClass(this._oOptions.sParamClsId, this._oOptions.sParamClsName,this._oOptions.iVisibleBlogCount);
		} else if (this._oOptions.sListType == 'archive') {
			var _sParamArchDateStr = this._oOptions.sParamArchDate;
			if (this._oOptions.sParamArchDate == '')
				_sParamArchDateStr = "1900-01";		
			var _s = _sParamArchDateStr.split("-");	
			$("blogArchives").style.display="block";
			$("_$_blog_prev_class").style.display="none";
			this._sYearPara = _s[0];
			this._sMonthPara = _s[1];
			this.openBlogsByArchive(_sParamArchDateStr + '-01', s[0] + '��' + s[1] + '��', this._oOptions.iVisibleBlogCount);
		} else {
			this.openBlogsAll(this._oOptions.iVisibleBlogCount);
			
		}
		// ��ʼ�����������
		this.prevBlogLeft = new NEBlog.PrevBlogLeft(this._sObjectName+".prevBlogLeft", this._sObjectName, this._sPageName, 
					   {sStyle: this._oOptions.sStyle, 
						sHostName: this._oOptions.sHostName, 
						iVisitorRank:this._oOptions.iVisitorRank,
						iHostId: this._oOptions.iHostId, 
						sHostPath:this._oOptions.sHostPath,
						sServerName: this._oOptions.sServerName, 
						sListType: this._oOptions.sListType, 
						sYearPara: this._sYearPara, 
						sMonthPara:this._sMonthPara });
	
		// ��ȡ��ȡ����	
		BlogBean.getBlogClasses(this._oOptions.iHostId, {
			callback:function(oDataFromServer) {
				this.prevBlogLeft.showBlogClasses(oDataFromServer, this._oOptions.sClsElemId, 
								this._oOptions.iTotalBlogCount, this._oOptions.iVisitorRank,
								this._oOptions.sListType,this._oOptions.sEncodeClassId);
			    this._oBlogClasses = oDataFromServer;
			}.bind(this)
		});	

			
	},
	/**
	 * ������־
	 * @private
	 * @param	{Object}	oParams		����
	 * @param	{Object}	fnCallback	�ص�����
	 * @return	{Void}
	 */
	_loadBlogs: function(oParams, fnCallback) {
		if (oParams.loadType == "class") {
			BlogBean.getBlogsByClassInPrevBlog(oParams.limit, oParams.offset, this._oOptions.iHostId, true, this._oOptions.iVisitorRank, true, oParams.classId, {
				callback: function(oDataFromServer) {
					oDataFromServer.each(function(e) {
						e.hasRead = 0;//�ӷ���˶�����������Ϊδ��ȡ
					});
					fnCallback(oDataFromServer);
				}
			});
		} else if (oParams.loadType == "archive") {
			BlogBean.getBlogsByArchiveInPrevBlog(oParams.limit, oParams.offset, this._oOptions.iHostId, true, this._oOptions.iVisitorRank, true, oParams.archDate, {
				callback: function(oDataFromServer) {
					oDataFromServer.each(function(e) {
						e.hasRead = 0;//�ӷ���˶�����������Ϊδ��ȡ
					});
					fnCallback(oDataFromServer);
				}
			});
		} else {
			BlogBean.getBlogsInPrevBlog(oParams.limit, oParams.offset, this._oOptions.iHostId, true, this._oOptions.iVisitorRank, true, {
				callback: function(oDataFromServer) {
					oDataFromServer.each(function(e) {
						e.hasRead = 0;//�ӷ���˶�����������Ϊδ��ȡ
					});
					fnCallback(oDataFromServer);
				}
			});
		}	
	},
	/**
	 * ��ʾ��־ҳ��
	 * @private
	 * @param	{Array}		oParams		����
	 * @param	{Object}	oParams		����
	 * @return	{Void}
	 * @see		#incBlogAccessCount
	 * @see		#showRelateBlogCircle
	 * @see		#_test4PB
	 * 
	 */
	_showBlog: function(oBlogs, oParams) {
		var _oData = {blogs: oBlogs, visitorName: this._oOptions.sVisitorName, 
					  style: this._oOptions.sStyle,
					  hostName: this._oOptions.sHostName, loadType: oParams.loadType,
					  objName: this._sObjectName, blogRange:this._oOptions.iBlogRange};
		var _sResult = NEBlog.PrevBlog.blogsTemplate.process(_oData);
		$("_$_blog_prev_list").innerHTML = _sResult;
		/*if (oBlogs != null && oBlogs.length > 0) {
			this.incBlogAccessCount(oBlogs[0]);  //�����־������Ŀ+1
			this._iOpenBlogId = oBlogs[0].id;
			this.showRelateBlogCircle(this._iOpenBlogId);
		}*/
		this._iOpenBlogId = null;
		
		if (this._oTester4PB != null) {
			if (oBlogs == null || oBlogs.length == 0) {
				this._test4PB("Blog", "null");
			} else {
				var _aBId = oBlogs.pluck("id");
				this._test4PB("Blog", _aBId);
			}
		}
	},
	/**
	 * ������־���ʼ���
	 * @param	{Object}	oBlog
	 * @return	{Void}
	 */
	incBlogAccessCount: function(oBlog) {
		if (oBlog.hasRead == 0) {
			BlogBean.incBlogAccessCount(oBlog.id, oBlog.userId, {
				callback: function(oDataFromServer) {
					if (oDataFromServer == true) {
						oBlog.hasRead = 1;
						oBlog.accessCount++;
					}
				}
			});
		}
	},
	/**
	 * ��������, ���ڴ���tag��ǩ, ��tag���������	
	 * @param	{Object}	oData
	 * @return	{Void}
	 */
	_fnBlogFilter: function(oData) {
		oData.each( function(e) { 
			//����tag
			if (e.tag != null && e.tag != "") {
				e.tagArray = e.tag.split(",");
			} else {
				e.tagArray = null;
			}
		});	
	},
	/**
	 * ���µ���־ҳ, �½���ҳ�����
	 * @private
	 * @param	{Number}	iBlogCount		��Ҫ��ʾ����־����
	 * @param	{Object}	oLoadParam		������־�����Ĳ���
	 * @param	{Object}	oPresentParam	��ʾ��־�����Ĳ���
	 * @return	{Void}
	 * @see		#NetEase.CachePage
	 * @see		NetEase.CachePage#nextPage
	 * @see		#_loadBlogs
	 * @see		#_showBlog
	 * @see		#_fnBlogFilter
	 * @see		#_updtBlogIt
	 */
	_newBlogPager: function(iBlogCount, oLoadParam, oPresentParam) {
		/*this._oBlogPager = new NetEase.CachePage({pageSize: this._oOptions.iBlogRange, prefetch: false, prefetchMulti: 0, markID: "blogPageNav:_$$_blog_prev_bottom_menu", styleDir: this._oOptions.sStyle, totalSize: iBlogCount,
			loadFunc: this._loadBlogs.bind(this), loadParam:oLoadParam, presentFunc: this._showBlog.bind(this), userPresentFuncParam: oPresentParam, filterFunc: this._fnBlogFilter,
			updateIterator: this._updtBlogIt, needRefreshAfterUpdate: false, beforeID: "blogPageNav2", 
			beforePrev: this._scrollToBlogTop, beforeNext: this._scrollToBlogTop});	*/
		this._oBlogPager = new NetEase.PageNumber({pageSize: this._oOptions.iBlogRange, markID: "blogPageNav:_$$_blog_prev_bottom_menu", styleDir: this._oOptions.sStyle, totalSize: iBlogCount,
			loadFunc: this._loadBlogs.bind(this), loadParam:oLoadParam, presentFunc: this._showBlog.bind(this), userPresentFuncParam: oPresentParam, filterFunc: this._fnBlogFilter,
			updateIterator: this._updtBlogIt, needRefreshAfterUpdate: false, beforeID: "_$$_blog_prev_bottom_menu", 
			beforePrev: this._scrollToBlogTop, beforeNext: this._scrollToBlogTop, beforeChange:this._scrollToBlogTop});	
		this._oBlogPager.show();
	},
	/**
	 * ��־������, ��Ϊ��������newBlogPager����
	 * @param	{Object}	oFirst	��һ������
	 * @param	{Object}	oSecond	�ڶ�������
	 * @return	{Boolean}	�����Ƿ����
	 */
	_updtBlogIt: function(oFirst, oSecond) {
		return (oFirst.id == oSecond.id);
	},
	/**
	 * �������뵽��־���򶥲�
	 * 
	 */
	_scrollToBlogTop: function() {
		new Effect.ScrollTo("_$$_blog_prev_top_menu", {duration:0.0});//�Զ�����
	},
	/**
	 * ��������־, ��������"������־"����
	 * @param	{Number}	��ʾ����־������
	 * @return	{Void}
	 * @see		#_newBlogPager
	 */
	openBlogsAll: function(iBlogCount) {
		var _oLoadParam = {loadType:"all"};
		var _oPresentParam = {loadType:"all"};
		this._newBlogPager(iBlogCount, _oLoadParam, _oPresentParam);
		var _sLoadType = "������־";
		$("blogType").innerHTML = _sLoadType;
	},
	/**
	 * ���������ʾ��־, ��������ĳ����־��𴥷�
	 * @param	{Number}	iClassId	���id
	 * @param	{String}	sClassName	��������
	 * @return	{Void}
	 * @see		#_showBlog
	 * @see		NetEase.CachePage#reset
	 * @see		#_newBlogPager
	 */
	openBlogsByClass: function(iClassId, sClassName, iBlogCount) {
		if (iBlogCount == 0) {
			this._showBlog(null, {loadType:"class"});
			var _sLoadType = "(���ࣺ" + sClassName + ")";
			$("blogType").innerHTML = _sLoadType;
			if(this._oBlogPager==null)
			{
				var _oLoadParam = {loadType:"class", classId: iClassId};
				var _oPresentParam = {loadType:"class"};
				this._newBlogPager(iBlogCount, _oLoadParam, _oPresentParam);
			}
			this._oBlogPager.reset();
			return;
		}
		var _oLoadParam = {loadType:"class", classId: iClassId};
		var _oPresentParam = {loadType:"class"};
		this._newBlogPager(iBlogCount, _oLoadParam, _oPresentParam);
		var _sLoadType = "���ࣺ" + sClassName ;
		$("blogType").innerHTML = _sLoadType;
	},
	/**
	 * ���ݴ浵��ʾ��־, ��������"�浵"����
	 * @param	{String}	sArchDate		��׼���ڸ�ʽ	2007-01-01
	 * @param	{String}	sArchDateStr	�����ַ���	2007��1��
	 * @return	{Void}
	 */
	openBlogsByArchive: function(archDate, archDateStr, iBlogCount) {
		var _oLoadParam = {loadType:"archive", archDate: archDate};
		var _oPresentParam = {loadType:"archive"};
		this._newBlogPager(iBlogCount, _oLoadParam, _oPresentParam);
		var _sLoadType = "�鵵��" + archDateStr ;
		$("blogType").innerHTML = _sLoadType;
	},
	/**
	 * ����־������ͬ����־
	 * @param	{Number}	iClassId	���id
	 * @param	{String}	sClassName	��������
	 * @return	{Void}
	 * @see		#openBlogsByClass
	 */
	openSameClass: function(iClassId, sClassName) {
		var _iBlogCount = 0;
		for (var i = 0; i < this._oBlogClasses.length; i++) {
			if (this._oBlogClasses[i].id == iClassId) {
				_iBlogCount = this._oBlogClasses[i].publishedBlogCount;
			}
		}
		this.openBlogsByClass(iClassId, sClassName, _iBlogCount);
	},
	/**
	 * ��ʾ������ÿһƪ��־
	 * @param	{String}	sBlogId			��־id
	 * @param	{String}	sShowIdPrefix	��־��ʾ�����idǰ׺
	 * @param	{String}	sArrowIdPrefix	�۵���ͷͼƬ��idǰ׺
	 * @return	{Void}		
	 * @see		NetEase.CachePage#getAllCachedData
	 * @see		#incBlogAccessCount
	 * @see		#showRelateBlogCircle
	 * @see		Effect#BlindDown
	 * @see		Effect#BlindUp
	 * @see		Effect#ScrollTo
	 */
	show_hide_each_blog: function(sBlogId, sShowIdPrefix, sArrowIdPrefix){
		if (this._bShowHiding == true)
			return;	
		var _sShowId = sShowIdPrefix + sBlogId;
		var _sArrowId = sArrowIdPrefix + sBlogId;
		var _oShowDiv = $(_sShowId);		
		if(_oShowDiv.style.display=="none") {
			this._bShowHiding = true;
			if (_sArrowId != null) {
				Element.removeClassName(_sArrowId,"n2");
	  			Element.addClassName(_sArrowId,"n3");
			}	
			// ����blogId�������ҵ�ǰҳ������Ҫչ����blog�ĵĶ��󸳸�_oBlog
			var _oCachedBlogs = this._oBlogPager.getAllCachedData();
			
			
			var _oBlog = null;
			if (_oCachedBlogs != null) {
				_oBlog = _oCachedBlogs.detect(
					function(e){
						if(e.id == sBlogId)
							return true;
						return false;
					}
				);
			}
			//չ����־���������ֲ�������
			var _oBlogtext = $("blogtext_" + sBlogId);
			if (_oBlogtext != null && _oBlog != null && _oBlog.content != null) {
				_oBlogtext.innerHTML = _oBlog.content;
			}
			//�ر�֮ǰչ������־	
			Effect.BlindDown(_sShowId,{duration:0.1, 
				userCallBack: function(){
					
					if (this._iOpenBlogId != null) {
						var _sOldShowId = sShowIdPrefix + this._iOpenBlogId;
						var _sOldArrowId = sArrowIdPrefix + this._iOpenBlogId;
						if (_sOldArrowId != null)	{
							Element.removeClassName(_sOldArrowId,"n3");
	  						Element.addClassName(_sOldArrowId,"n2");
						}
						$(_sOldShowId).style.display = "none";			
						var _sOldBlogtext = $("blogtext_" + this._iOpenBlogId);
						if (_sOldBlogtext != null) {
							_sOldBlogtext.innerHTML = "";
						}	  		
						this._iOpenBlogId = null;
					}
					this._iOpenBlogId = sBlogId;
					//new Effect.ScrollTo("blog_" + sBlogId, {duration:0.0});//�Զ����뵽����
					this._bShowHiding = false;
				}.bind(this)
			});
				 	
			if (_oBlog == null)
				return;
			// ���ӷ��ʼ���
			this.incBlogAccessCount(_oBlog);
			this.showRelateBlogCircle(sBlogId);
			
		}else { // ������־����ʾ
	  		this._bShowHiding = true;
	  		if (_sArrowId != null){
	  			Element.removeClassName(_sArrowId,"n3");
	  			Element.addClassName(_sArrowId,"n2");
	  		}		
			var _oBlogtext = $("blogtext_" + sBlogId);
	  		Effect.BlindUp(_sShowId,{duration:0.1, 
	  			userCallBack: function(){ 
					if (_oBlogtext != null) {
						_oBlogtext.innerHTML = "";
					}
					this._iOpenBlogId = null;
					this._bShowHiding = false;				
	  			}.bind(this)
	  		});
	  	}	
	},
	/**
	 * �����־�Ƽ������Ȧ���Ƽ�
	 * @param	{String}	sBlogId			��־id
	 * @return	{Void}		
	 */
	showRelateBlogCircle: function(sBlogId){
		if(sBlogId == null) // ��ǰδ����־
			return;
		/*	for test
					var _oList = [
						[{blogTitle:"titdddddddddddddddddddddddddddddddddle1",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}},
						{blogTitle:"����2dddddddddddddddddddddddddddddddd3424242424244242424",circle:{name:"aaaaaaaaaaaaaaaaaaaaaaaaa"}}],
						[{blogTitle:"������dddddddddddddddddddddddddddddddddd��",circle:{name:"��������������������������������������������������������������"}},
						{blogTitle:"dddddddddddddddddddddddddddd",circle:{name:"��������������������������������������������������������������"}}],
						[{blogTitle:"111111dddddddddddddddddddddddddddddddddddddd11111111111",circle:{name:"��������"}},{blogTitle:"�Ұ����й�",circle:{name:"��������"}}]
						,[{blogTitle:"111111dddddddddddddddddddddddddddddddddddddd11111111111",circle:{name:"��������"}},{blogTitle:"�Ұ����й�",circle:{name:"��������"}}]
						,[{blogTitle:"111111dddddddddddddddddddddddddddddddddddddd11111111111",circle:{name:"��������"}},{blogTitle:"�Ұ����й�",circle:{name:"��������"}}]
						,[{blogTitle:"111111dddddddddddddddddddddddddddddddddddddd11111111111",circle:{name:"��������"}},{blogTitle:"�Ұ����й�",circle:{name:"��������"}}]
					];
		var _oData = {relateCircles: _oList, circleBaseUrl: this._oOptions.sCircleBaseUrl};		
		var _sResult = NEBlog.PrevBlog.relateBlogCircleTemplate.process(_oData);

		$("relateBlogCircle_"+sBlogId).innerHTML = _sResult;
		*/
		if(this._oRelateBlogCircleMap[sBlogId] == null){ // δ�������ݣ������������������
			BlogBean.getRelateBlogsCircles(sBlogId, this._oOptions.iHostId, {
				callback: function(oDataFromServer) {
					var _oList = oDataFromServer;
					var _oData = {relateCircles: _oList, circleBaseUrl: this._oOptions.sCircleBaseUrl};
					
					var _sResult = NEBlog.PrevBlog.relateBlogCircleTemplate.process(_oData);
					if(_sResult == ""){
						$("relateBlogCircle_"+sBlogId).style.display = "none";
					}else{
						$("relateBlogCircle_"+sBlogId).innerHTML = _sResult;
					}
					this._oRelateBlogCircleMap[sBlogId] = _sResult;
				}.bind(this)
			});
		}else{//������
				var _sResult = this._oRelateBlogCircleMap[sBlogId];
				if(_sResult == ""){
					$("relateBlogCircle_"+sBlogId).style.display = "none";
				}else{
					$("relateBlogCircle_"+sBlogId).innerHTML = _sResult;
				}
		}
	},
	/**
	 * ��ĳƪ��־������
	 * @param	{String}	sBlogId			��־id
	 * @param	{Number}	iCommentCount	��ƪ��־����������
	 * @param	{String}	sBlogTitle		��־����
	 * @param	{String}	sBlogPermalink	��־�Ĺ̶����ӵ�ַ
	 * @return	{Void}	
	 */
	openComments: function(sBlogId, iCommentCount, sBlogTitle, sBlogPermalink) {	
			
		if ($('openCom_' + sBlogId).value == 2) {//������δ����
			BlogBean.getComments(sBlogId, this._oOptions.iCommentRange, 0, {
				callback:function(oDataFromServer) {
					$('openCom_' + sBlogId).value = 0;//��ʾ�����Ѿ�����
			    	this._showComments(oDataFromServer, sBlogId, iCommentCount, sBlogTitle, sBlogPermalink, 
			    				"comShow_" + sBlogId, "comPub_" + sBlogId);			
			  }.bind(this)
			});		
			
		}else {
			this._upDownComments(sBlogId, null);		
		}		 
	},
	/**
	 * �������۶���, ����ʾ
	 * @private
	 * @param	{Array}		oComments		���۶�������
	 * @param	{String}	sBlogId			��־id
	 * @param	{Number}	iCommentCount	��ƪ��־����������
	 * @param	{String}	sBlogTitle		��־����
	 * @param	{String}	sBlogPermalink	��־�Ĺ̶����ӵ�ַ
	 * @param	{String}	sComShowElemId	������ʾ��div��id
	 * @param	{String}	sComPubElemId	���۷�����div��id
	 * @return	{Void}	
	 * 
	 * @see		NetEase.CommentPublish
	 * @see		#_test4PB
	 */
	_showComments: function(oComments, sBlogId, iCommentCount, sBlogTitle, sBlogPermalink, sComShowElemId, sComPubElemId) {	
		
		this.commentPublishes[sBlogId] = new NetEase.CommentPublish(oComments, sBlogId, iCommentCount, sComShowElemId, sComPubElemId, 
								{ sStyle: this._oOptions.sStyle, bCanClose: true, 
								  bHasCancelBtn: true, bNeedCheckLogin: false, bNeedCheckRight: true, 
								  iAllowComment: this._oOptions.iGlobalAllowComment, iPageSize: this._oOptions.iCommentRange,
								  iHostId: this._oOptions.iHostId, sHostName: this._oOptions.sHostName, 
								  iVisitorId: this._oOptions.iVisitorId, sVisitorName: this._oOptions.sVisitorName, 
								  sVisitorNickname:  this._oOptions.sVisitorNickname, sVisitorAvatar: this._oOptions.sVisitorAvatar, 
								  iVisitorRank: this._oOptions.iVisitorRank, sVisitorIP: this._oOptions.sVisitorIP, 
								  iEditorMaxLen: NEBlog.PrevBlog.COMMENT_MAX_LENTH, sLoginRedirect: '/'+this._oOptions.sHostName+'/blog/',
								  iInputWidth: 720, iEditorHeight: 230, fnOpenCommentEffect: this._upDownComments.bind(this), 
								  fnAddComment: this._addNewComment.bind(this), oAddCommentParams: {blogUserId: this._oOptions.iHostId, blogTitle: sBlogTitle, blogPermalink: sBlogPermalink},
								  fnMoreData: this._getCommentsByPage.bind(this), fnAfterAddComment: this._afterAddComment.bind(this), 
								  oAfterAddCommentParams: {hostId: this._oOptions.iHostId, blogId: sBlogId}, fnCloseComments: this._closeComments.bind(this),	fnReportBad: this._reportBad,			
								  sObjName: this._sObjectName+'.commentPublishes[\''+sBlogId+'\']',
								  bSupportDeleteComment:true,
								  fnDelComment: this.delComment, oDelCommentParams:{blogId:sBlogId},
								  fnAfterDelComment:this.afterDelComment.bind(this), oAfterDelCommentParams:{blogId:sBlogId},
								  fnCloseCommentDiv: this.closeCssTabBarAll.bind(this)});
								
		if (this._oTester4PB) {
			if (oComments == null || oComments.length == 0) {
				this._test4PB("Com", "null");
			} else {
				var _aComId = oComments.pluck("id");
				this._test4PB("Com", _aComId, sBlogId);
			}
		}	
	},
	/**
	 * ���ݷ�ҳ��ҳ����ȡ���۶���
	 * @private
	 * @param	{String}	sBlogId				��־id
	 * @param	{Number}	iLimit				�Ӻ�̨ȡ����������
	 * @param	{Number}	iOffset				�ӵڼ������ۿ�ʼȡ			
	 * @param	{Object}	fnPostPageComment	���۷�����div��id
	 * @return	{Void}	
	 */
	_getCommentsByPage: function(sBlogId, iLimit, iOffset, fnPostPageComment) {
		BlogBean.getComments(sBlogId, iLimit, iOffset, {
			callback:function(oDataFromServer) {
				fnPostPageComment(oDataFromServer);	
		    	if (this._oTester4PB) {
		    		if (oDataFromServer == null || oDataFromServer.length == 0) {
		    			this._test4PB("Com", "null");
		    		} else {
						var _aComId = oDataFromServer.pluck("id");
						this._test4PB("Com", _aComId, sBlogId);
		    		}
				}		
			}.bind(this)
		});	
	},
	/**
	 * ���̨�������
	 * @private
	 * @param	{Object}	oNewComment			��Ҫ��ӵ�����
	 * @param	{Object}	oParams				���۲���
	 * @param	{Object}	fnPostAddComment 	�����Ϻ�������
	 * @return	{Boolean}	
	 * @see		#checkOtherSiteUrl
	 * @see		#captchaWarning
	 */
	_addNewComment: function(oNewComment, oParams, fnPostAddComment) {
		//��ʽ���������򷵻صĶ���
		oNewComment.blogId = oNewComment.parentId;
		oNewComment.blogUserId = oParams.blogUserId;

		var _iFilterType = 0;
		var _oValcodeDiv = $("valcode"+oNewComment.parentId);
		var _sValcode;
		if (_oValcodeDiv != null)
			_sValcode = _oValcodeDiv.value;
		else
			_sValcode = -1;
		if (this._oOptions.iVisitorRank < Const.Rank.Friend) {
			var _bMatch = checkOtherSiteUrl(oNewComment.content);
			if (_bMatch) {
				alert(Local.Message.Blog[0]);
				fnPostAddComment(null);
				return false;
			}
		}
		BlogBean.addComment(oNewComment, _iFilterType, _sValcode,{
			callback:function(oDataFromServer) {	 	
				fnPostAddComment(oDataFromServer);
			},
			errorHandler:function(ex) {
				//��֤�������ʾ
			  	if (captchaWarning(ex, "$$_comsubmithint" + oNewComment.blogId)) {
			  		fnPostAddComment(null);
			  		return false;
			  	}
			  	//�ؼ��ֹ�����ʾ
			  	var _iFilter = filterWarning(ex);
			  	if (_iFilter == -1) {
			  		fnPostAddComment(null);
			  		return false;
			  	}		  
			  	fnPostAddComment(null);		
			}
		});	
	},
	/**
	 * ����������Ŀ����ʾ
	 * @private
	 * @param	{Object}	oNewComment			��Ҫ��ӵ�����
	 * @param	{Object}	oParams				���۲���
	 * @return	{Void}
	 * @see		NEBlog.prevBlogLeft#showRecentComments
	 * @see		NetEase.CachePage#updateOne
	 */
	_afterAddComment: function (oNewComment, oParams) {
		//������������ʾ
		var _oComCount = $("comCount_" + oParams.blogId);
		var _iCount = 0;
		if (_oComCount != null) {
			_iCount = _oComCount.innerHTML;
			_iCount = parseInt(_iCount) + 1;
			_oComCount.innerHTML = _iCount;
		}
		
		//���»����еĶ�Ӧblog��������
		var _oItem = new Object();
		_oItem.id = oParams.blogId;
		_oItem.commentCount = _iCount;
		this._oBlogPager.updateOne(_oItem);
		new Effect.ScrollTo("openComDiv"+oParams.blogId, {duration:0.0});
	},
	/**
	 * չ���͹ر�����
	 * @private
	 * @param	{String}	sBlogId		��־id
	 * @param	(Object}	fnInit		��ʼ������
	 * @return	{Void}
	 * @see		#_closeComments
	 * @see		Effect#BlindDown
	 */
	_upDownComments: function(sBlogId, fnInit) {
		if ($('openCom_' + sBlogId).value == 0) {	
			this._closeAll(sBlogId);
			var _oSucc = {success: false};
			this._iGid = 2;
			
			new Effect.BlindDown(
				'com_'+sBlogId,
				{
					stateId: sBlogId + "_$$S$$", 
					succObj: _oSucc, 
					duration:0.5, 
					userCallBack: function(){
						if (this._iGid != 2) 
							this._closeComments(sBlogId); 
						if(fnInit != null) {
							fnInit();
						}					
					}.bind(this)
				}
			);		
			if (_oSucc.success)
				$('openCom_' + sBlogId).value = 1;		
			else
				$('openCom_' + sBlogId).value = 0;

		} else {
			this._closeComments(sBlogId);
		}
	},
	/**
	 * �ر�����
	 * @private
	 * @param	{String}	sBlogId		��־id
	 * @return	{Void}
	 * @see		Effect#BlindDown
	 */
	_closeComments: function(sBlogId) {
		if ($('openCom_' + sBlogId).value == 1) {	
			var _oSucc = {success: false};
			new Effect.BlindUp('com_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSucc, duration:0.5});

			if (_oSucc.success)
				$('openCom_' + sBlogId).value = 0;	
			else
				$('openCom_' + sBlogId).value = 1;
		}
	},
	/**
	 * �򿪹̶�����
	 * @private
	 * @param	{String}	sBlogId		��־id
	 * @return	{Void}
	 * @see		#closePermalink
	 * @see		Effect#BlindDown
	 */
	openPermalink: function (sBlogId) {
		if ($('openPerma_' + sBlogId).value == 0) {	
			this._closeAll(sBlogId);
			var _oSucc = {success: false};
			this._iGid = 1;
			new Effect.BlindDown('perma_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSucc , duration:0.5, 
				userCallBack: function(){
					if (this._iGid != 1) 
						this.closePermalink(sBlogId);
				}.bind(this) 
			});
			if (_oSucc.success) {
				$('openPerma_' + sBlogId).value = 1;	
			}
			else
				$('openPerma_' + sBlogId).value = 0;				
			
		} else {
			this.closePermalink(sBlogId);	
		}
	},
	
	/**
	 * �رչ̶�������ʾ
	 * @private
	 * @param	{String}	sBlogId		��־id
	 * @return	{Void}
	 * @see		Effect#BlindUp
	 */
	closePermalink: function(sBlogId) {
		if ($('openPerma_' + sBlogId).value == 1) {	
			var _oSucc = {success: false};
			new Effect.BlindUp('perma_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSucc, duration:0.5});
			if (_oSucc.success) {
				$('openPerma_' + sBlogId).value = 0;	
			}else
				$('openPerma_' + sBlogId).value = 1;
		}
	},

	/**
	 * ������ͨ��
	 * @param	{String}	sBlogId			��־id
	 * @param	{String}	sTrackbackUrl	����ͨ���ַ
	 * @return	{Void}
	 */
	openTrackbacks: function(sBlogId, sTrackbackUrl) {	
		if ($('openTrack_' + sBlogId).value == 2) {//������δ����	
			BlogBean.getTrackbacks(sBlogId, {
				callback:function(oDataFromServer) {
					this._openTrackbacksCB(oDataFromServer, sTrackbackUrl, sBlogId);
				}.bind(this)
			});
		}else {
			if ($('openTrack_' + sBlogId).value == 0) {
				this._closeAll(sBlogId);	
				var _oSucc = {success: false};
				this._iGid = 3;
				new Effect.BlindDown('track_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSucc, duration:0.5, 
					userCallBack: function(){
						if (this._iGid != 3) 
							this.closeTrackbacks(sBlogId);
					}.bind(this)
				});
				
				if (_oSucc.success) {
					$('openTrack_' + sBlogId).value = 1;				
				}else
					$('openTrack_' + sBlogId).value = 0;				
				
			} else {
				this.closeTrackbacks(sBlogId);	
			}
		}		
	},
	
	/**
	 * �ӷ���˻�ȡblog������ͨ���Ļص�������Ϊģ���������
	 * @private
	 * @param	{Array}		oTrackbacks		����ͨ���������
	 * @param	{String}	sTrackbackUrl	����ͨ���ַ
	 * @param	{String}	sBlogId			��־id
	 * @return	{Void}
	 * @see		#openTrackbacks
	 * @see		#_test4PB
	 * 
	 */
	_openTrackbacksCB: function(oTrackbacks, sTrackbackUrl, sBlogId) {
		
		var _oData = {tbs: oTrackbacks, tbUrl: sTrackbackUrl, blogId: sBlogId, 
					  hostName: this._oOptions.sHostName, objName: this._sObjectName,
					  visitorName: this._oOptions.sVisitorName, style: this._oOptions.sStyle,
					  hostId: this._oOptions.iHostId};
					  
		var _sResult = NEBlog.PrevBlog.trackbacksTemplate.process(_oData);
		$("track_" + sBlogId).innerHTML = _sResult;
		$('openTrack_' + sBlogId).value = 0;
		this.openTrackbacks(sBlogId, sTrackbackUrl);
		if (this._oTester4PB) {
			if (oTrackbacks == null || oTrackbacks.length == 0) {
				this._test4PB("Tb", "null");
			} else {
				var _aTbId = oTrackbacks.pluck("id");
				this._test4PB("Tb", _aTbId, sBlogId);
			}
		}	
	},
	/**
	 * �ر�����ͨ��
	 * @param	{String}	sBlogId			��־id
	 * @return	{Void}
	 */
	closeTrackbacks: function(sBlogId) {
		if ($('openTrack_' + sBlogId).value == 1) {	
			var _oSucc = {success: false};
			new Effect.BlindUp('track_' + sBlogId, {stateId: sBlogId + "_$$S$$", succObj: _oSucc, duration:0.5});
			if (_oSucc.success) {
				$('openTrack_' + sBlogId).value = 0;	
			}else
				$('openTrack_' + sBlogId).value = 1;
		}
	},

	/**
	 * ����̶����ӡ����ۡ�Ȧ�Ӻ�����ͨ���ĸ�ҳ���д򿪵ģ���ر���
	 * @param	{String}	sBlogId			��־id
	 * @return	{Void}
	 * @see		#closePermalink
	 * @see		#_closeComments
	 * @see		#closeCircles
	 * @see		#closeTrackbacks
	 */
	_closeAll: function(sBlogId) {
		if ($('perma_' + sBlogId) != null &&
			$('openPerma_' + sBlogId).value == 1) {
			this.closePermalink(sBlogId);
		}
		else if ($('com_' + sBlogId) != null &&
			$('openCom_' + sBlogId).value == 1) {
			this._closeComments(sBlogId);
		} 
		else if ($('track_' + sBlogId) != null &&
			$('openTrack_' + sBlogId).value == 1) {
			this.closeTrackbacks(sBlogId);
		}
	},
	/**
	 * ת��tagҳ��
	 * @param	{Object}	oTag		tag����
	 * @return	{Void}
	 */
	searchTagObj: function(oTag) {
		BlogBean.getHostAllTags({
			callback:function(oTags) {
		  		var _oUserTagList =  oTags;
		    	this._searchTagObjCb(oTag, _oUserTagList);
		  	}.bind(this)
		});	
		return false;
	},
	/**
	 * ��ѯtag����Ӧ����ת��ַ����ת
	 * @param	{Object}	oTag			tag����
	 * @param	{Object}	oUserTagList	�û����е�tag�б����
	 * @return	{Boolean}	
	 * @see		#getTagObjByTagname
	 */
	_searchTagObjCb: function(oTag, oUserTagList) {
		var _oTag = getTagObjByTagname(oTag, -1, oUserTagList);
		if(_oTag==null)
			return false;

		//���ĳ�ȫ��������by mml
		window.open("http://blog.163.com/search/?t=tag&q=" + encodeURIComponent(_oTag.tagName) + "&o=blog");
					
		//location.href = "prevTag.do?host=" + this._oOptions.sHostName + "&isGlobal=false&type=3&tagId=" + _oTag.id;
		return false;
	},
	/**
	 * �ٱ���������
	 * @param	{Object}	oReport			�ٱ���Ϣ����
	 * @param	{Object}	fnPostReport	�ٱ���ִ�к���
	 * @return	{Void}
	 */
	_reportBad: function(oReport, fnPostReport) {
		PreUserReportBean.addUserReport(oReport, fnPostReport); 
	},
	
	/**
	 * ��ʾ����div add by gw
	 */
	
	showShareDiv:function(id, permalink){
		var url = 'http://' + UD.hostName + '.blog.163.com/' + permalink;
		if(jsWindowManager == null)
			jsWindowManager = new NetEase.JSWindowManager();
		if(g_shareDiv == null){		  		
			g_shareDiv = new NetEase.ShareByEmail({aId:'share'+id, jsWindowManager:jsWindowManager, visitorName:UD.visitorName,type:'blog', url:url}); 
	    }else{
	    	g_shareDiv.refreshNew({aId:'share'+id, type:'blog', url:url});
	    }
	},
	/**
	 * ����
	 * @private
	 * @param	{String}	sKey		���Զ���ļ�
	 * @param	{String}	vValues		���Զ����ֵ
	 * @param	{String}	sRelValue	...
	 * @return	{Void}	
	 */
	_test4PB: function(sKey, vValues, sRelValue) {
		if (!this._oTester4PB)
			return;
		switch (sKey) {
			case "Blog":
				this._oTester4PB.setArray("Blog", vValues);
				break;
			case "Com":
				this._oTester4PB.set2DArray("Com", vValues, "Blog", sRelValue);
				break;
			case "Tb":
				this._oTester4PB.set2DArray("Tb", vValues, "Blog", sRelValue);
				break;
		}	
	},
	

	upDownCssTabBar: function (sBlogId, sDivId){
		
		var _sOpenedDivId = this._oCssTabBarUpdownStatus[sBlogId];
		if(_sOpenedDivId==undefined || _sOpenedDivId==null || _sOpenedDivId=="") {
			//û�б�չ����, չ�������Div
			Element.addClassName(sDivId,"s");
			this._oCssTabBarUpdownStatus[sBlogId] = sDivId;
			Element.addClassName('cssTabBar_'+ sBlogId,"bd1b");
		}else if(_sOpenedDivId == sDivId){
			//����Ѿ�չ����Div
			Element.removeClassName(_sOpenedDivId,"s");
			this._oCssTabBarUpdownStatus[sBlogId] = "";
			Element.removeClassName('cssTabBar_'+ sBlogId,"bd1b");
		}else{
			//��tools����չ������Ŀ, ��չ��ͬһtools�е���һ��Ŀ
			Element.removeClassName(_sOpenedDivId,"s");
			Element.addClassName(sDivId,"s");
			this._oCssTabBarUpdownStatus[sBlogId] = sDivId;
		}
	},
	closeCssTabBarAll: function(sBlogId){
		this._oCssTabBarUpdownStatus[sBlogId] = "";
		Element.removeClassName('openComDiv' + sBlogId,"s");
		Element.removeClassName('openTbDiv' + sBlogId,"s");
		Element.removeClassName('openPermaDiv' + sBlogId,"s");
		Element.removeClassName('cssTabBar_'+ sBlogId,"bd1b");
	},
	
	delComment: function(sCommentId, oParams, fnPostDelComment){
		BlogBean.deleteComment(sCommentId, oParams.blogId, {
			  callback:function(oDataFromServer) {
			    fnPostDelComment(oDataFromServer);
			  }
			});
	},
	
	afterDelComment: function(oParams){
		var _iCount =  parseInt($("comCount_" + oParams.blogId).innerHTML)-1;
		$("comCount_" + oParams.blogId).innerHTML = _iCount;
		//���»����еĶ�Ӧblog��������
		var _oItem = new Object();
		_oItem.id = oParams.blogId;
		_oItem.commentCount = _iCount;
		this._oBlogPager.updateOne(_oItem);
	}	
}

