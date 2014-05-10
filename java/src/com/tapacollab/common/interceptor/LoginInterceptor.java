package com.tapacollab.common.interceptor;


import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.tapacollab.user.User;

import java.util.Map;

public class LoginInterceptor implements Interceptor {
    public void destroy() {
        //
    }

    public void init() {
        //
    }

    public String intercept(ActionInvocation actionInvocation) throws Exception {
        final ActionContext context = actionInvocation.getInvocationContext();
        Map session = actionInvocation.getInvocationContext().getSession();

        // Is there a "user" object stored in the user's HttpSession?
        Object user = session.get(User.SESSION_NAME);
        if (user == null) {
            return "login";
        } else {
            return actionInvocation.invoke();
        }
    }
}
