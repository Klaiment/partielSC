import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
public class OrderSystem {
    private Map<Integer, List<String>> orderList = new HashMap<>();
    public void addNewOrder(Integer customerID, String itemName) {
        List<String> items = orderList.getOrDefault(customerID, new ArrayList<>());
        items.add(itemName);
        orderList.put(customerID, items);
    }
    public void modifyOrder(Integer customerID, Integer itemIndex, String newItemName) {
        List<String> items = orderList.get(customerID);
        if (items == null) {
            throw new IllegalArgumentException("No order found for customer ID: " + customerID);
        }
        if (itemIndex < 0 || itemIndex >= items.size()) {
            throw new IndexOutOfBoundsException("Invalid item index: " + itemIndex);
        }
        items.set(itemIndex, newItemName);
    }

    public void removeOrder(Integer customerID, Integer itemIndex) {
        List<String> items = orderList.get(customerID);
        if (items == null) {
            throw new IllegalArgumentException("No order found for customer ID: " + customerID);
        }
        if (itemIndex < 0 || itemIndex >= items.size()) {
            throw new IndexOutOfBoundsException("Invalid item index: " + itemIndex);
        }
        items.remove(itemIndex);
    }

    public void printOrders() {
        for (Map.Entry<Integer, List<String>> entry : orderList.entrySet()) {
            System.out.println("Customer ID: " + entry.getKey());
            List<String> items = entry.getValue();
            if (items != null && !items.isEmpty()) {
                System.out.println("Items: " + String.join(", ", items));
            } else {
                System.out.println("Items: none");
            }
            System.out.println();
        }
    }
    public static void main(String[] args) {
        OrderSystem orderSystem = new OrderSystem();

        orderSystem.addNewOrder(1, "Apple");
        orderSystem.addNewOrder(1, "Banana");
        orderSystem.addNewOrder(2, "Orange");

        System.out.println("Initial Orders:");
        orderSystem.printOrders();

        orderSystem.modifyOrder(1, 1, "Grapes");
        System.out.println("Orders after modification:");
        orderSystem.printOrders();

        orderSystem.removeOrder(2, 0);
        System.out.println("Orders after removal:");
        orderSystem.printOrders();
    }
}

