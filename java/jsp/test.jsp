<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="s" uri="/struts-tags" %>

<jsp:include page="/jsp/includes/header.jsp"/>

<h1><s:text name="welcome" /></h1>

<p>
    <s:url id="localeEN" namespace="/" action="" >
        <s:param name="request_locale" >en</s:param>
    </s:url>
    <s:url id="localeDE" namespace="/" action="" >
        <s:param name="request_locale" >de</s:param>
    </s:url>
    <s:a href="%{localeEN}" >English</s:a>
    <s:a href="%{localeDE}" >German</s:a>
</p>

<s:if test="hasActionErrors()">
    <div id="fieldErrors">
        <s:actionerror/>
    </div>
</s:if>

<s:form action="hello" namespace="/" method="post" name="myForm" theme="xhtml">
    <s:textfield name="message" size="40" maxlength="40" required="true" key="your.message-label"/>
    <s:submit key="submit" />
</s:form>

<jsp:include page="/jsp/includes/footer.jsp"/>